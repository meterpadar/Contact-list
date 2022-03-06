import { useState } from 'react';
import './Logged.css';
import { SearchBar } from './../SearchBar/SearchBar.js';
import { Contacts } from './../Contacts/Contacts.js';
import { AddContact } from './../AddContact/AddContact.js';

export function Logged({setSuccessLogin, userId, lang}) {
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [search, setSearch] = useState('');
  const [resetSearchButton, setResetSearchButton] = useState(false);

  const euDialCodes = {'AUT': '+43', 'ALB': '+355', 'AND': '+376', 'ARM': '+374', 'BEL': '+32', 'BLR': '+375', 'BIH': '+387', 'BGR': '+359', 'FRO': '+298', 'GEO': '+995', 'GIB': '+350', 'ISL': '+354', 'IMN': '+44', 'HRV': '+385', 'CYP': '+357', 'CZE': '+420', 'DNK': '+45', 'EST': '+372', 'FIN': '+358', 'FRA': '+33', 'DEU': '+49', 'XKX': '+381', 'LIE': '+423', 'MKD': '+389', 'MDA': '+373', 'MCO': '+377', 'MNE': '+382', 'GRC': '+30', 'HUN': '+36', 'IRL': '+353', 'ITA': '+39', 'LVA': '+371', 'LTU': '+370', 'LUX': '+352', 'NOR': '+47', 'RU': '+7', 'SMR': '+378', 'SRB': '+381', 'CHE': '+41', 'TUR': '+90', 'UKR': '+380', 'GBR': '+44', 'MLT': '+356', 'NLD': '+31', 'POL': '+48', 'PRT': '+351', 'ROU': '+40', 'SVK': '+421', 'SVN': '+386', 'ESP': '+34', 'SWE': '+46', 'VAT': '+39'}


  const showAddContactFormClick = (event) => {
    event.preventDefault();

    setShowAddContactForm(true);
  };

  const hideAddContactFormClick = (event) => {
    event.preventDefault();

    setShowAddContactForm(false);
  };

  const logutClick = (event) => {
    event.preventDefault();

    setSuccessLogin(false);
  };

  return (
    !showAddContactForm ?
    <div className="Logged">
      <div className='header-container'>
        <SearchBar 
          search={search}
          setSearch={setSearch}
          setResetSearchButton={setResetSearchButton}
          lang={lang}
        />
        <button 
          className='log-out'
          onClick={logutClick}
        >
          {lang ? 'Log out' : 'Odhlás sa'}
        </button>
      </div>
      <div className='contact-header-add-contact-button-container'>
        <h1 className='contact-header'>{lang ? 'Contact list' : 'Zoznam kontaktov'}</h1>
        <button 
          className='add-contact-button'
          onClick={showAddContactFormClick}
        >
          {lang ? 'Add contact' : 'Pridať kontakt'}
        </button>
      </div>
      <Contacts 
        userId={userId}
        search={search}
        setSearch={setSearch}
        resetSearchButton={resetSearchButton}
        setResetSearchButton={setResetSearchButton}
        euDialCodes={euDialCodes}
        lang={lang}
      />
    </div> :
    <div className="Logged">
      <div className='header-container'>
        <SearchBar 
          search={search}
          setSearch={setSearch}
          setResetSearchButton={setResetSearchButton}
          lang={lang}
        />
        <button 
          className='log-out'
          onClick={logutClick}
        >
          {lang ? 'Log out' : 'Odhlás sa'}
        </button>
      </div>
      <div className='contact-header-add-contact-button-container'>
        <h1 className='contact-header'>Contact list</h1>
        <button 
          className='add-contact-button'
          onClick={hideAddContactFormClick}
        >
          {lang ? 'Hide form' : 'Skryť formulár'}
        </button>
      </div>
      <AddContact 
        setShowAddContactForm={setShowAddContactForm}
        userId={userId}
        euDialCodes={euDialCodes}
        lang={lang}
      />
      <Contacts 
        userId={userId}
        search={search}
        setSearch={setSearch}
        resetSearchButton={resetSearchButton}
        setResetSearchButton={setResetSearchButton}
        euDialCodes={euDialCodes}
        lang={lang}
      />
    </div> 
  );
}