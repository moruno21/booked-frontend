export default interface ILoan {
  _id: string;
  userId: string;
  bookId: string;
  initialDate: Date;
  finalDate: Date;
}
