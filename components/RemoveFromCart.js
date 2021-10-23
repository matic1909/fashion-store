import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const RemoveButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    optimisticResponse: {
      deleteCartItem: {
        __typename: 'CartItem',
        id,
      },
    },
  });
  return (
    <RemoveButton
      disabled={loading}
      type="button"
      onClick={removeFromCart}
      title="Remove this item from the cart"
    >
      &times;
    </RemoveButton>
  );
}
