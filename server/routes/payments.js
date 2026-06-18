import express from 'express';
import crypto from 'crypto';
import { body, validationResult } from 'express-validator';
import Razorpay from 'razorpay';

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

router.post(
  '/create-order',
  [
    body('amount')
      .isInt({ min: 1, max: 5000000 })
      .withMessage('Amount must be between 1 and 5000000 INR'),
    body('currency').optional().isIn(['INR']).withMessage('Only INR is supported'),
    body('name').optional().trim().isLength({ min: 2, max: 80 }),
    body('email').optional().isEmail().withMessage('Enter a valid email'),
    body('phone').optional().isLength({ min: 10, max: 15 }).withMessage('Enter a valid phone number'),
    body('description').optional().trim().isLength({ min: 3, max: 120 }),
  ],
  validate,
  async (req, res) => {
    try {
      const razorpay = getRazorpayClient();
      if (!razorpay) {
        return res.status(500).json({
          success: false,
          message: 'Payment gateway is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET on the server.',
        });
      }

      const { amount, currency = 'INR', name, email, phone, description } = req.body;
      const order = await razorpay.orders.create({
        amount: Number(amount) * 100,
        currency,
        receipt: `a2s_${Date.now()}`,
        notes: {
          customerName: name || '',
          customerEmail: email || '',
          customerPhone: phone || '',
        },
      });

      res.status(201).json({
        success: true,
        data: {
          keyId: process.env.RAZORPAY_KEY_ID,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          name: 'A2S Ecom Solutions',
          description: description || 'E-Commerce Seller Growth Consultation',
          prefill: {
            name: name || '',
            email: email || '',
            contact: phone || '',
          },
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.post(
  '/verify',
  [
    body('razorpay_order_id').trim().notEmpty().withMessage('Missing order id'),
    body('razorpay_payment_id').trim().notEmpty().withMessage('Missing payment id'),
    body('razorpay_signature').trim().notEmpty().withMessage('Missing signature'),
  ],
  validate,
  (req, res) => {
    try {
      const secret = process.env.RAZORPAY_KEY_SECRET;
      if (!secret) {
        return res.status(500).json({
          success: false,
          message: 'Payment gateway is not configured on server.',
        });
      }

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: 'Payment signature verification failed' });
      }

      res.json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
