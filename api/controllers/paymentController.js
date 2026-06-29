const Payment = require('../models/Payment');
const Reservation = require('../models/Reservation');

// Simulated payment processing (replace with Stripe in production)
const processPayment = async (req, res) => {
  try {
    const { reservationId, amount, method, cardNumber, cardName, expiry, cvv } = req.body;

    if (!reservationId || !amount) {
      return res.status(400).json({ message: 'Reservation ID and amount are required.' });
    }

    if (method === 'card') {
      const cleaned = (cardNumber || '').replace(/\s/g, '');
      if (cleaned.length < 15) {
        return res.status(400).json({ message: 'Invalid card number.' });
      }
      if (!cardName || !expiry || !cvv) {
        return res.status(400).json({ message: 'Please complete all card details.' });
      }
      if (cvv.length < 3) {
        return res.status(400).json({ message: 'Invalid security code.' });
      }
    }

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    const transactionId = `LX-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const payment = await Payment.create({
      reservation: reservationId,
      guest: req.guest?._id || reservation.guest,
      amount,
      method: method || 'card',
      cardLast4: cardNumber ? cardNumber.replace(/\s/g, '').slice(-4) : undefined,
      status: 'Completed',
      transactionId,
    });

    reservation.paymentStatus = 'Paid';
    reservation.status = reservation.status === 'Pending' ? 'Confirmed' : reservation.status;
    await reservation.save();

    res.status(201).json({
      success: true,
      payment: {
        id: payment._id,
        transactionId: payment.transactionId,
        amount: payment.amount,
        status: payment.status,
        cardLast4: payment.cardLast4,
      },
      reservation: {
        id: reservation._id,
        status: reservation.status,
        paymentStatus: reservation.paymentStatus,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { processPayment };
