import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance,
    });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const transaction = createTransactionService.execute(request.body);

    return response.status(201).json(transaction);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default transactionRouter;
