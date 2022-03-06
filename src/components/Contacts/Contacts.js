import './Contacts.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, removeContact, editContact } from './../../slices/contactsSlice.js';
import { selectUsers, removeContactFromUser } from './../../slices/usersSlice.js';
import { v4 as uuidv4 } from 'uuid';

export function Contacts({userId, search, setSearch, resetSearchButton, setResetSearchButton, euDialCodes, lang}) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const users = useSelector(selectUsers);

  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editDialCode, setEditDialCode] = useState('+43');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editContactAlert, setEditContactAlert] = useState('');
  const [down, setDown] = useState(0);
  const [up, setUp] = useState(10);

  const handleEditFirstName = (event) => {
    setEditFirstName(event.target.value);
  };

  const handleEditLastName = (event) => {
    setEditLastName(event.target.value);
  };

  const handleEditDialCode = (event) => {
    setEditDialCode(event.target.value);
  };

  const handleEditPhoneNumber = (event) => {
    setEditPhoneNumber(event.target.value);
  };

  const handleEditEmail = (event) => {
    setEditEmail(event.target.value);
  };

  const handleEditAddress = (event) => {
    setEditAddress(event.target.value);
  };

  const handleEditNote = (event) => {
    setEditNote(event.target.value);
  };

  const toggleContactDetailsClick = (event) => {
    const contactDetails = document.getElementById(event.target.getAttribute('contact-details-id'));
    const editContactId = 'e' + event.target.getAttribute('contact-details-id').substring(1);
    const editContact = document.getElementById(editContactId);

    if (contactDetails.style.display === 'none') {
      contactDetails.style.display = 'initial';
      editContact.style.display = 'none';
    } else {
      contactDetails.style.display = 'none';
    };
  };

  const toggleEditContactClick = (event) => {
    const editedContact = document.getElementById(event.target.getAttribute('edit-contact-id'));
    const contactDetailsId = 'd' + event.target.getAttribute('edit-contact-id').substring(1);
    const contactDetails = document.getElementById(contactDetailsId);

    Object.values(contacts).map(contact => {
      if (`e_${contact.contactId}` === `${event.target.getAttribute('edit-contact-id')}`) {
        setEditFirstName(contact.firstName);
        setEditLastName(contact.lastName);
        setEditPhoneNumber(contact.phoneNumber);
        setEditEmail(contact.email);
        setEditAddress(contact.address);
        setEditNote(contact.note);
      };
    });   

    if (editedContact.style.display === 'none') {
      editedContact.style.display = 'flex';
      contactDetails.style.display = 'none';

      for(let i=0; i < Object.keys(contacts).length; i++) {
        event.target.getAttribute('edit-contact-id') === document.getElementById(`e_${Object.values(contacts)[i].contactId}`).id ?
        document.getElementById(`e_${Object.values(contacts)[i].contactId}`).style.display = 'flex' :
        document.getElementById(`e_${Object.values(contacts)[i].contactId}`).style.display = 'none';
      }
    } else {
      editedContact.style.display = 'none';
    }

    setEditContactAlert('');
  };

  const preRemoveContactClick = (event) => {
    event.target.style.display = 'none';

    document.getElementById(event.target.getAttribute('yes-contact-id')).style.display = 'initial';

    document.getElementById(event.target.getAttribute('remove-contact-id')).style.display = 'initial';
  }

  const noRemoveContactClick = (event) => {
    document.getElementById(event.target.getAttribute('no-contact-id')).style.display = 'initial';

    document.getElementById(event.target.getAttribute('yes-contact-id')).style.display = 'none';

    event.target.style.display = 'none';
  }

  const removeContactClick = (event) => {
    dispatch(removeContact({
      contactId: event.target.getAttribute('contact-id')
    }));

    dispatch(removeContactFromUser({
      userId: userId,
      removedContactId: event.target.getAttribute('contact-id')
    }));
  };

  const editContactClick = (event) => {
    event.preventDefault();

    const editContactId = event.target.getAttribute('contact-id');
    const editContactFrom = document.getElementById(`e_${editContactId}`);

    if (editFirstName === '') {
      lang ? setEditContactAlert('First name is required !') : setEditContactAlert('Meno je povinné !');
      return;
    } else if (editLastName === '') {
      lang ? setEditContactAlert('Last name is required !') : setEditContactAlert('Priezvisko je povinné !');
      return;
    } else if (editPhoneNumber === '') {
      lang ? setEditContactAlert('Phone number is required !') : setEditContactAlert('Telefón je povinný !');
      return;
    } else if (isNaN(editPhoneNumber)) {
      lang ? setEditContactAlert('Phone number has to contains only numbers !') : setEditContactAlert('Telefón musí obsahovať len čísla !');
      return;
    };

    dispatch(editContact({
      contactId: editContactId,
      firstName: editFirstName,
      lastName: editLastName,
      dialCode: editDialCode,
      phoneNumber: editPhoneNumber,
      email: editEmail,
      address: editAddress,
      note: editNote
    }));

    for (let i=0; i < editContactFrom.children.length; i++) {
      editContactFrom.children[i].value = '';
    };

    editContactFrom.style.display = 'none';

    setEditContactAlert('');
    setEditDialCode('+43');
  };

  const resetSearchClick = () => {
    setResetSearchButton(false);
    setSearch('');
  }

  const previousPageClick = () => {
    setDown(down - 10);
    setUp(up - 10);
  };

  const nextPageClick = () => {
    if (Object.keys(contacts).length < down) return;

    setDown(down + 10);
    setUp(up + 10);
  };

  return (
    <div className="Contacts">
      <button 
        className='reset-search'
        style={!resetSearchButton ? {display: 'none'} : {display: 'initial'}}
        onClick={resetSearchClick}
      >{lang ? 'Reset search' : 'Resetuj hľadanie'}</button>
      <ul className='contacts-container'>
      {
        Object.values(contacts).map((contact, index) => (
        users[userId].contacts.includes(contact.contactId) && down < index && index <= up ?
        <li 
          id={contact.contactId} 
          key={contact.contactId} 
          className='contact-container'
          style={!contact.firstName.includes(search) && !contact.lastName.includes(search) ? {display: 'none'} : {display: 'list-item'}}
        >
          <div className='contact-main-info'>
            <span>{contact.firstName} {contact.lastName}</span>
            <div className='contact-buttons-container'>
              <button
              contact-details-id={`d_${contact.contactId}`}
              onClick={toggleContactDetailsClick}
              >
                {lang ? 'Details' : 'Detaily'}
              </button>
              <button
                onClick={toggleEditContactClick}
                edit-contact-id={`e_${contact.contactId}`}
              >
                {lang ? 'Edit' : 'Upraviť'}
              </button>
              <button
                onClick={preRemoveContactClick}
                id={`no_${contact.contactId}`}
                yes-contact-id={`yes_${contact.contactId}`}
                remove-contact-id={`remove_${contact.contactId}`}
              >
                {lang ? 'Remove' : 'Vymazať'}
              </button>
              <button
                className='yes-button'
                style={{display: 'none'}}
                id={`yes_${contact.contactId}`}
                contact-id={contact.contactId}
                onClick={removeContactClick}
              >
                {lang ? 'Yes' : 'Áno'}
              </button>
              <button
                className='no-button'
                style={{display: 'none'}}
                id={`remove_${contact.contactId}`}
                no-contact-id={`no_${contact.contactId}`}
                yes-contact-id={`yes_${contact.contactId}`}
                onClick={noRemoveContactClick}
              >
                {lang ? 'No' : 'Nie'}
              </button>
            </div>
          </div>
          <form 
            id={`e_${contact.contactId}`}
            className='edit-contact-container'
            style={{display: 'none'}}
          >
            <h2 className='edit-contact-alert'>{editContactAlert}</h2>
            <input 
              type="text" 
              placeholder={lang ? 'First Name' : 'Meno'}
              value={editFirstName}
              onChange={handleEditFirstName}
            />
            <input 
              type="text" 
              placeholder={lang ? 'Last Name' : 'Priezvisko'}
              value={editLastName}
              onChange={handleEditLastName}
            />
            <div className='edit-dial-phone'>
              <select 
                name="edit-dial-code" 
                id="edit-dial-code"
                value={editDialCode}
                onChange={handleEditDialCode}
              >
                {
                  Object.entries(euDialCodes).map(code => (
                      <option key={code[0]} value={code[1]}>{`${code[0]} ${code[1]}`}</option>
                    ))
                }
              </select>
              <input 
                type="tel" 
                placeholder={lang ? 'Phone Number' : 'Telefón'}
                value={editPhoneNumber}
                onChange={handleEditPhoneNumber}
              />
            </div>
            <input 
              type="email" 
              placeholder='Email'
              value={editEmail}
              onChange={handleEditEmail}
            />
            <input 
              type="text" 
              placeholder={lang ? 'Address' : 'Adresa'}
              value={editAddress}
              onChange={handleEditAddress}
            />
            <input 
              type="text" 
              placeholder={lang ? 'Note' : 'Poznámka'}
              value={editNote}
              onChange={handleEditNote}
            />
            <button 
              type='submit'
              contact-id={contact.contactId}
              onClick={editContactClick}
            >
              {lang ? 'Edit' : 'Upraviť'}
            </button>
          </form>
          <ul 
            id={`d_${contact.contactId}`} 
            className='contact-details-container'
            style={{display: 'none'}} 
          >
            <li>
              <span>{lang ? 'Phone number' : 'Telefón'}</span>
              <span>{contact.dialCode} {contact.phoneNumber}</span>
            </li>
            <li>
              <span>Email</span>
              <span>{contact.email}</span>
            </li>
            <li>
              <span>{lang ? 'Address' : 'Adresa'}</span>
              <span>{contact.address}</span>
            </li>
            <li>
              <span>{lang ? 'Note' : 'Poznámka'}</span>
              <span>{contact.note}</span>
            </li>
          </ul> 
        </li> :
        null
        ))
      }
      </ul> 
      <ul className='pages-container'>
        <li>
          <button
            style={down < 10 ? {display: 'none'} : {display: 'initial'}}
            onClick={previousPageClick}
          >
            <i className="fa-solid fa-circle-arrow-left"></i>
          </button>
        </li>
        <li>
          <button
            style={up > Object.keys(contacts).length - 2 ? {display: 'none'} : {display: 'initial'}}
            onClick={nextPageClick}
          >
            <i className="fa-solid fa-circle-arrow-right"></i>
          </button>
        </li>
      </ul>
    </div>
  );
}