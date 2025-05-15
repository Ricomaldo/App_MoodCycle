import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '@core/domain/entities/Conversation';
import { Message, MessageInput } from '@core/domain/entities/conversation/Message';
import { AppDispatch } from '@store/index';
import { ConversationRepository } from '@core/data/repositories/ConversationRepository';

interface ConversationState {
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ConversationState = {
  currentConversation: null,
  messages: [],
  isLoading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<Conversation | null>) => {
      state.currentConversation = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetConversation: state => {
      state.currentConversation = null;
      state.messages = [];
      state.error = null;
    },
  },
});

export const {
  setCurrentConversation,
  setMessages,
  addMessage,
  setLoading,
  setError,
  resetConversation,
} = conversationSlice.actions;

export const loadCurrentConversation = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const repo = new ConversationRepository();
    const conversation = await repo.getCurrentConversation(userId);
    dispatch(setCurrentConversation(conversation));
    dispatch(setMessages(conversation.messages));
    dispatch(setError(null));
  } catch (e: any) {
    dispatch(setError(e.message));
    dispatch(setCurrentConversation(null));
    dispatch(setMessages([]));
  } finally {
    dispatch(setLoading(false));
  }
};

export const sendMessage =
  (conversationId: string, message: MessageInput) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const repo = new ConversationRepository();
      await repo.addMessage(conversationId, message);
      // Recharge la conversation après ajout
      const conversation = await repo.getConversationById(conversationId);
      dispatch(setMessages(conversation.messages));
      dispatch(setError(null));
    } catch (e: any) {
      dispatch(setError(e.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export default conversationSlice.reducer;
