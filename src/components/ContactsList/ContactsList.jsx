import PropTypes from 'prop-types';
import { List } from './ContactsList.styled';

const ContactsList = ({ contacts, onDelete }) => {
    return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <button type="button" onClick={() => onDelete(id)}>Delete
          </button>
        </li>
      ))}
        </List>
  );
};
ContactsList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
    onDelete: PropTypes.func,
}

export default ContactsList;