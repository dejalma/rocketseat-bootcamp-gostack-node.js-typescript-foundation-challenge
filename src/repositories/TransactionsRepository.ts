import Transaction from '../models/Transaction';

interface TransactionDTO {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private getTotalOfType(typeToSum: 'income' | 'outcome'): number {
    return this.transactions
      .filter(({ type }) => typeToSum === type)
      .reduce((sum, transaction) => sum + transaction.value, 0);
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    if (this.transactions.length > 0) {
      income = this.getTotalOfType('income');
      outcome = this.getTotalOfType('outcome');
    }

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
