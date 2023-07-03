const mockItemQntZero = {
  _id: '6489e4ca99c9aa9775763a45',
  title: 'Classic Burger',
  price: '9.99',
  qnt: 0,
  shopId: '64720b1fbaf6ac095a6a48e4',
};

const mockAfterAddedUnique = {
  user: null,
  items: [{ ...mockItemQntZero, qnt: 1 }],
};

const mockFormUpd = {
  name: 'test',
  email: 'test@gmail.com',
  phone: 380983445029,
  address: 'test street 15',
};

export { mockAfterAddedUnique, mockFormUpd, mockItemQntZero };
