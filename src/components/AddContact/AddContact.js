import './AddContact.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addContact } from './../../slices/contactsSlice.js';
import { addContactToUser } from './../../slices/usersSlice.js';
import { selectContacts } from './../../slices/contactsSlice.js';


export function AddContact({userId, setShowAddContactForm, euDialCodes, lang}) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dialCode, setDialCode] = useState('+43');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [addContactAlert, setAddContactAlert] = useState('');

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleDialCode = (event) => {
    setDialCode(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleNote = (event) => {
    setNote(event.target.value);
  };

  const saveContact = (event) => {
    event.preventDefault();

    let contactId = `c_${uuidv4()}`;

    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const dialCodeSelect = document.getElementById('dial-code');
    const dialCodeInput = dialCodeSelect.options[dialCodeSelect.selectedIndex].value;
    const phoneNumberInput = document.getElementById('phone-number');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('address');

    if (firstNameInput.value === '') {
      lang ? setAddContactAlert('First name is required !') : setAddContactAlert('Meno je povinné !');
      return;
    } else if (lastNameInput.value === '') {
      lang ? setAddContactAlert('Last name is required !') : setAddContactAlert('Priezvisko je povinné !');
      return;
    } else if (phoneNumberInput.value === '') {
      lang ? setAddContactAlert('Phone number is required !') : setAddContactAlert('Telefón je povinný !');
      return;
    } else if (isNaN(phoneNumberInput.value)) {
      lang ? setAddContactAlert('Phone number has to contains only numbers !') : setAddContactAlert('Telefón musí obsahovať len čísla !');
      return;
    }

    for (let i=0; i < Object.keys(contacts).length; i++) {
      if (Object.values(contacts)[i].firstName === firstNameInput.value && Object.values(contacts)[i].lastName === lastNameInput.value) {
        lang ? setAddContactAlert('Contact with this name already exists !') : setAddContactAlert('Kontakt s týmto menom už existuje !');
        return;
      } else if (Object.values(contacts)[i].phoneNumber === phoneNumberInput.value) {
        lang ? setAddContactAlert('This phone number already exists !') : setAddContactAlert('Toto telefónne číslo už existuje !');
        return;
      };
    };

    dispatch(addContact({
      contactId: contactId,
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      dialCode: dialCode,
      phoneNumber: phoneNumber,
      email: email,
      address: address,
      note: note
    }));

    dispatch(addContactToUser({
      userId: userId,
      contactId: contactId
    }));

    setShowAddContactForm(false);
  }

  return (
    <div className="AddContact">
      <h2 className='add-contact-alert'>{addContactAlert}</h2>
      <form 
        className='add-contact-form-container'
        onSubmit={saveContact}
      >
        <input 
          id='first-name' 
          type="text" 
          placeholder={lang ? 'First Name*' : 'Meno*'} 
          onChange={handleFirstName}
        />
        <input 
          id='last-name'
          type="text" 
          placeholder={lang ? 'Last Name*' : 'Priezvisko*'} 
          onChange={handleLastName}
        />
        <div className='dial-phone'>
          <select 
            name="dial-code" 
            id="dial-code"
            onChange={handleDialCode}
          >
          {
            Object.entries(euDialCodes).map(code => (
                <option key={code[0]} value={code[1]}>{`${code[0]} ${code[1]}`}</option>
              ))
          }
          </select>
          <input 
            id='phone-number'
            type="tel" 
            placeholder={lang ? 'Phone Number*' : 'Telefón*'}
            onChange={handlePhoneNumber}
          />
        </div>
        <input 
          id='email'
          type="email" 
          placeholder='Email'
          onChange={handleEmail}
        />
        <input 
          id='address'
          type="text" 
          placeholder={lang ? 'Address' : 'Adresa'}
          onChange={handleAddress}
        />
        <input 
          type="text" 
          placeholder={lang ? 'Note' : 'Poznámka'}
          onChange={handleNote}
        />
        <button type='submit'>{lang ? 'Add contact' : 'Pridať'}</button>
      </form>
    </div>
  );
}