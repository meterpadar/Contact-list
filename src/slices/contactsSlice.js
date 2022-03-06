import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
	name: 'contacts',
	initialState: {
		'c_0': {
			contactId: 'c_0',
			userId: 'u_0',
			firstName: 'First',
			lastName: 'Last',
			dialCode: '+421',
			phoneNumber: '000111',
			email: 'email@email.com',
			address: 'Address 21',
			note: 'something'
		}
	},
	reducers: {
		addContact: (state, action) => {
			const { contactId, userId, firstName, lastName, dialCode, phoneNumber, email, address, note } = action.payload;

			state[contactId] = {
				contactId: contactId,
				userId: userId,
				firstName: firstName,
				lastName: lastName,
				dialCode: dialCode,
				phoneNumber: phoneNumber,
				email: email,
				address: address,
				note: note
			}
		},

		editContact: (state, action) => {
			const { contactId, firstName, lastName, dialCode, phoneNumber, email, address, note } = action.payload;

			state[contactId] = {
				contactId: contactId,
				firstName: firstName,
				lastName: lastName,
				dialCode: dialCode,
				phoneNumber: phoneNumber,
				email: email,
				address: address,
				note: note
			}
		},

		removeContact: (state, action) => {
			const { contactId } = action.payload;

			delete state[contactId];
		}
	}
});

export const selectContacts = (state) => state.contacts;
export const { addContact, removeContact,editContact } = contactsSlice.actions;
export default contactsSlice.reducer;