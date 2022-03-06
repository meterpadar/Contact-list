import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
	name: 'users',
	initialState: {
		'u_0': {
			userId: 'u_0',
			username: 'Username',
			email: 'email@email.com',
			password: 'password',
			contacts: ['c_0']
		}
	},
	reducers: {
		registerUser: (state, action) => {
			const { userId, username, email, password } = action.payload;

			state[userId] = {
				userId: userId,
				username: username,
				email: email,
				password: password,
				contacts: []
			}
		},

		addContactToUser: (state, action) => {
			const { userId, contactId } = action.payload;

			state[userId].contacts.push(contactId);
		},

		removeContactFromUser: (state, action) => {
			const { userId, removedContactId } = action.payload;

			state[userId].contacts.filter(contactId => contactId === removedContactId);
		}
	}
});

export const selectUsers = (state) => state.users;
export const { registerUser, addContactToUser, removeContactFromUser } = usersSlice.actions;
export default usersSlice.reducer;