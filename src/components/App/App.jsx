import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Container } from './App.styled';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter';
 
export const App = () => {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const addContacts = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const existName = contacts.find(contact =>
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

    setContacts([contact, ...contacts]);
  };
    const onDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

    const onChangeFilter = e => {
    setFilter(e.target.value);
  };
  const getVisibleContacts = () => { 
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
      const visibleContacts = getVisibleContacts();

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
