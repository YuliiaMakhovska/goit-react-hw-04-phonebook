import { Component } from "react";
import { nanoid } from "nanoid";
import { Container } from './App.styled';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter';
 
export class App extends Component {
   state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  
  addContacts = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const existName = this.state.contacts.find(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );
    if (existName) {
      Report.failure(`${normalizedName} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prev => ({
      contacts: [contact, ...prev.contacts],
    }));
  };
  
  onDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  onChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const { addContacts, onChangeFilter, onDelete } = this;
    const visibleContacts = this.getVisibleContacts();

    return (<Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContacts} /> 
      <h2>Contacts</h2>
      <Filter value={filter} onChange={onChangeFilter} />
      <ContactsList contacts={visibleContacts} onDelete={onDelete}
      />
    </Container>
    )
  }
};
