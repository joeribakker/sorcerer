export const setGameName = name => state => ({
	...state,
	game: {
		...state.game,
		name: name,
	},
});

export const setCurrentRoomId = roomId => state => ({
	...state,
	game: {
		...state.game,
		currentRoomId: roomId,
	},
});

export const resetActiveKeyboardKeys = () => state => ({
	...state,
	game: {
		...state.game,
		activeKeyboardKeys: [],
	}
});

export const addActiveKeyboardKey = keyToAdd => state => {
	if (state.game.activeKeyboardKeys.includes(keyToAdd)) {
		return state;
	}

	return {
		...state,
		game: {
			...state.game,
			activeKeyboardKeys: [
				...state.game.activeKeyboardKeys,
				keyToAdd,
			],
		},
	};
};

export const removeActiveKeyboardKey = keyToRemove => state => ({
	...state,
	game: {
		...state.game,
		activeKeyboardKeys: state.game.activeKeyboardKeys.reduce((keysWithoutKeyToRemove, pressedKey) => {
			if (keyToRemove === pressedKey) {
				return keysWithoutKeyToRemove;
			}

			return [
				...keysWithoutKeyToRemove,
				pressedKey,
			];
		}, []),
	},
});


export const resetActiveMouseButtons = () => state => ({
	...state,
	game: {
		...state.game,
		activeMouseButtons: [],
	}
});

export const addActiveMouseButton = buttonToAdd => state => {
	if (state.game.activeMouseButtons.includes(buttonToAdd)) {
		return state;
	}

	return {
		...state,
		game: {
			...state.game,
			activeMouseButtons: [
				...state.game.activeMouseButtons,
				buttonToAdd,
			],
		},
	};
};

export const removeActiveMouseButton = buttonToRemove => state => ({
	...state,
	game: {
		...state.game,
		activeMouseButtons: state.game.activeMouseButtons.reduce((buttonsWithoutButtonToRemove, pressedButton) => {
			if (buttonToRemove === pressedButton) {
				return buttonsWithoutButtonToRemove;
			}

			return [
				...buttonsWithoutButtonToRemove,
				pressedButton,
			];
		}, []),
	},
});

export const getGame = (state) => {
	return state.game;
}

export const getCurrentRoomId = (state) => {
	return getGame(state).currentRoomId;
};
