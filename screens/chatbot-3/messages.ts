import { IMessage } from 'react-native-gifted-chat';

export default [
  {
    _id: 1,
    text: 'Hello insured! How can I help you?',
    createdAt: new Date(),
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: false,
      values: [
        {
          title: 'Reimbursements', // title
          value: 'reimbursement', // code
          messageId: 2
        },
        {
          title: 'Other',
          value: 'other',
          messageId: 3
        },
      ],
    },
    user: {
      _id: 1,
      name: 'Bot',
    },
  },
  {
    _id: 2,
    text: 'I see you want to talk about "Reimbursement"! What do you want?',
    createdAt: new Date(),
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: false,
      values: [
        {
          title: 'Reimbursement delay', // title
          value: 'reimbursement-delay', // code
          messageId: 6
        },
        {
          title: 'Consult claim',
          value: 'reimbursement-consult-claim',
        },
        {
          title: 'Send missing document',
          value: 'reimbursement-send-missing-document',
        },
      ],
    },
    user: {
      _id: 1,
      name: 'Bot',
    },
  },
  {
    _id: 3,
    text: 'Do you want to go somewhere else?',
    createdAt: new Date(),
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: false,
      values: [
        {
          title: 'Call contact service', // title
          value: 'contact-call', // code
          messageId: 5
        },
        {
          title: 'Close discussion',
          value: 'discussion-close',
          messageId: 4
        },
      ],
    },
    user: {
      _id: 1,
      name: 'Bot',
    },
  },
  { 
    _id: 4,
    text: 'Thank you, good bye!',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Bot',
    },
  },
  {
    _id: 5,
    text: 'This is the number of you assistant: #+216-98-000-000',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Bot',
    },
  },
  {
    _id: 6,
    text: 'The process might take between 48 and 72 hours',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Bot',
    },
  },
] as Array<IMessage>
 
