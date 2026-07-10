declare module "@green-api/whatsapp-api-client" {
	function restAPI(params: Params): API;

	type Optional<T> = T | null | undefined;
	type YesOrNo = "yes" | "no";

	interface Params {
		idInstance: string;
		apiTokenInstance: string;
		host?: string;
		media?: string;
	}

	interface API {
		message: MessageApi;
		file: FileAPI;
		instance: InstanceAPI;
		settings: SettingsAPI;
		group: GroupAPI;
		webhookService: WebhookServiceAPI;
		status: StatusAPI;
		contacts: ContactsAPI;
	}

	namespace Common {
		type MessageType =
			| "textMessage"
			| "extendedTextMessage"
			| "imageMessage"
			| "videoMessage"
			| "documentMessage"
			| "audioMessage"
			| "contactMessage"
			| "locationMessage"
			| "pollMessage"
			| "reactionMessage"
			| "pollUpdateMessage"
			| "quotedMessage"
			| "stickerMessage";

		type InstanceState =
			| "notAuthorized"
			| "authorized"
			| "blocked"
			| "starting"
			| "suspended"
			| "yellowCard"; // deprecated

		type OutgoingMessageStatus =
			| "sent"
			| "delivered"
			| "read"
			| "failed"
			| "noAccount"
			| "notInGroup"
			| "yellowCard"; // deprecated

		interface InstanceData {
			idInstance: number;
			wid: string;
			typeInstance: string;
		}
	}

	namespace Queue {
		type QueueMessageType =
			| "sendMessage"
			| "sendPoll"
			| "sendFileByUrl"
			| "sendLocation"
			| "sendContact"
			| "ForwardMessages";

		interface BaseQueueMessageBody {
			chatId: string;
			quotedMessageId?: string;
		}

		interface SendMessageBody extends BaseQueueMessageBody {
			message: string;
			linkPreview?: boolean;
		}

		interface SendPollBody extends BaseQueueMessageBody {
			message: string;
			options: Array<{
				optionName: string;
			}>;
			multipleAnswers?: boolean;
		}

		interface SendFileByUrlBody extends BaseQueueMessageBody {
			fileName: string;
			urlFile: string;
			caption?: string;
			archive?: boolean;
		}

		interface SendLocationBody extends BaseQueueMessageBody {
			latitude: number;
			longitude: number;
			nameLocation?: string;
			address?: string;
		}

		interface SendContactBody extends BaseQueueMessageBody {
			contact: {
				phoneContact: number;
				firstName?: string;
				middleName?: string;
				lastName?: string;
				company?: string;
			};
		}

		interface ForwardMessagesBody {
			chatId: string;
			chatIdFrom: string;
			messages: string[];
		}

		interface QueueMessage {
			messageID?: string;
			messagesIDs?: string[];
			type: QueueMessageType;
			body: SendMessageBody | SendPollBody | SendFileByUrlBody | SendLocationBody | SendContactBody | ForwardMessagesBody;
		}
	}

	namespace Message {
		interface ForwardableMessage {
			forwardingScore: number;
			isForwarded: boolean;
		}

		interface MediaMessage extends ForwardableMessage {
			jpegThumbnail: string;
		}

		interface TextMessageData {
			textMessage: string;
		}

		interface ExtendedTextMessageData extends MediaMessage {
			text: string;
			description: string;
			title: string;
		}

		interface FileMessageData extends MediaMessage {
			downloadUrl: string;
			caption: string;
			mimeType: string;
			fileName: string;
		}

		interface LocationMessageData extends MediaMessage {
			nameLocation: string;
			address: string;
			latitude: number;
			longitude: number;
		}

		interface ContactMessageData extends ForwardableMessage {
			displayName: string;
			vcard: string;
		}

		interface PollOption {
			optionName: string;
		}

		interface PollMessageData {
			name: string;
			options: PollOption[];
			multipleAnswers: boolean;
		}

		interface PollVote {
			optionName: string;
			optionVoters: string[];
		}

		interface PollUpdateMessageData {
			stanzaId: string;
			name: string;
			votes: PollVote[];
			multipleAnswers: boolean;
		}

		interface QuotedMessage {
			stanzaId: string;
			participant: string;
			typeMessage: Common.MessageType;
			textMessage?: string;
			pollMessageData?: {
				name: string;
				options: any[];
				multipleAnswers: boolean;
			};
			contact?: {
				displayName: string;
				vcard: string;
			};
			location?: {
				nameLocation: string;
				address: string;
				jpegThumbnail: string;
				latitude: number;
				longitude: number;
			};
			downloadUrl?: string;
			caption?: string;
			fileName?: string;
			jpegThumbnail?: string;
			mimeType?: string;
			isAnimated?: boolean;
			isForwarded?: boolean;
			forwardingScore?: number;
		}
	}

	namespace Journal {
		interface BaseMessage {
			idMessage: string;
			timestamp: number;
			typeMessage: Common.MessageType;
			chatId: string;
			isForwarded: boolean;
			forwardingScore: number;
			isEdited?: boolean;
			editedMessageId?: string;
			isDeleted?: boolean;
			deletedMessageId?: string;
		}

		interface IncomingFields {
			type: "incoming";
			senderId: string;
			senderName: string;
			senderContactName: string;
		}

		interface OutgoingFields {
			type: "outgoing";
			statusMessage: Common.OutgoingMessageStatus;
			sendByApi: boolean;
		}

		type MessageData = (
			| {
			typeMessage: "textMessage";
			textMessage: string;
		}
			| {
			typeMessage: "imageMessage" | "videoMessage" | "documentMessage" | "audioMessage" | "stickerMessage";
			downloadUrl: string;
			caption?: string;
			fileName: string;
			jpegThumbnail?: string;
			mimeType: string;
			isAnimated?: boolean;
			isForwarded: boolean;
			forwardingScore: number;
		}
			| {
			typeMessage: "locationMessage";
			location: {
				nameLocation: string;
				address: string;
				jpegThumbnail?: string;
				latitude: number;
				longitude: number;
				forwardingScore: number;
				isForwarded: boolean;
			};
		}
			| {
			typeMessage: "contactMessage";
			contact: {
				displayName: string;
				vcard: string;
				forwardingScore: number;
				isForwarded: boolean;
			};
		}
			| {
			typeMessage: "extendedTextMessage";
			textMessage: string;
			extendedTextMessage: {
				text: string;
				description?: string;
				title?: string;
				previewType?: string;
				jpegThumbnail?: string;
				forwardingScore: number;
				isForwarded: boolean;
			};
		}
			| {
			typeMessage: "pollMessage";
			pollMessageData: {
				name: string;
				options: Array<{ optionName: string }>;
				multipleAnswers: boolean;
			};
		}
			| {
			typeMessage: "pollUpdateMessage";
			pollMessageData: {
				name: string;
				stanzaId: string;
				votes: Array<{
					optionName: string;
					optionVoters: string[];
				}>;
				multipleAnswers: boolean;
			};
		}
			| {
			typeMessage: "reactionMessage";
			extendedTextMessageData: {
				text: string;
			};
		}
			) & {
			quotedMessage?: Message.QuotedMessage;
		};

		type IncomingJournalMessage = BaseMessage & IncomingFields & MessageData;
		type OutgoingJournalMessage = BaseMessage & OutgoingFields & MessageData;
		type JournalMessage = IncomingJournalMessage | OutgoingJournalMessage;
	}

	interface SendFileByUrlOptions {
		/** ID of the message to reply to */
		quotedMessageId?: string;
		/** Duration to show typing indicator before sending, in ms (1000–20000) */
		typingTime?: number;
		/** Use "recording" to show audio recording indicator; omit for standard text indicator */
		typingType?: "recording";
	}

	interface SendMessageOptions {
		/** Controls preview size: "large" or "small" */
		typePreview?: "large" | "small";
		/** Custom link preview configuration */
		customPreview?: {
			title: string;
			description?: string;
			link?: string;
			urlFile?: string;
			jpegThumbnail?: string;
		};
		/** Duration to show typing indicator before sending, in ms (1000–20000) */
		typingTime?: number;
	}

	interface InteractiveButton {
		buttonId: string;
		buttonText: string;
		type: "copy" | "call" | "url";
		copyCode?: string;
		phoneNumber?: string;
		url?: string;
	}

	interface SimpleButton {
		buttonId: string;
		buttonText: string;
	}

	class MessageApi {
		/**
		 * Sends a text message to a specific chat.
		 * @param chatId - The ID of the target chat.
		 * @param phoneNumber - @deprecated Use chatId instead.
		 * @param message - The text content of the message.
		 * @param quotedMessageId - ID of the message to reply to.
		 * @param linkPreview - Generates a preview for links in the message if true.
		 * @param options - Additional options: typePreview, customPreview, typingTime.
		 */
		sendMessage(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			message: string,
			quotedMessageId?: string,
			linkPreview?: boolean,
			options?: SendMessageOptions,
		): Promise<MessageResponse.Message>;

		/**
		 * Sends a poll to a specific chat.
		 * @param chatId - The ID of the target chat.
		 * @param phoneNumber - @deprecated Use chatId instead.
		 * @param message - The poll question.
		 * @param options - An array of available poll options.
		 * @param multipleAnswers - Allows multiple option selection if true.
		 * @param quotedMessageId - ID of the message to reply to.
		 */
		sendPoll(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			message: string,
			options: Message.PollOption[],
			multipleAnswers?: boolean,
			quotedMessageId?: string,
		): Promise<MessageResponse.Message>;

		/**
		 * Sends a location message to a specific chat.
		 * @param chatId - The ID of the target chat.
		 * @param phoneNumber - @deprecated Use chatId instead.
		 * @param nameLocation - The name of the location.
		 * @param address - The address of the location.
		 * @param latitude - The latitude of the location.
		 * @param longitude - The longitude of the location.
		 */
		sendLocation(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			nameLocation: Optional<string>,
			address: Optional<string>,
			latitude: number,
			longitude: number,
		): Promise<MessageResponse.Message>;

		/**
		 * Sends contact information.
		 * @param chatId - The ID of the target chat.
		 * @param phoneNumber - @deprecated Use chatId instead.
		 * @param contact - Object containing contact details.
		 */
		sendContact(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			contact: {
				phoneContact: number,
				firstName: Optional<string>,
				middleName: Optional<string>,
				lastName: Optional<string>,
				company: Optional<string>
			},
		): Promise<MessageResponse.Message>;

		/**
		 * Sends a URL link.
		 * @deprecated This method is deprecated, use sendMessage with linkPreview parameter instead.
		 * @param chatId - The ID of the target chat.
		 * @param phoneNumber - @deprecated Use chatId instead.
		 * @param urlLink - The URL to send.
		 */
		sendLink(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			urlLink: string,
		): Promise<MessageResponse.Message>

		/**
		 * Marks a chat or specific message as read.
		 * @param chatId - The ID of the target chat.
		 * @param phoneNumber - @deprecated Use chatId instead.
		 * @param idMessage - Optional ID of the specific message to mark as read.
		 */
		readChat(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			idMessage?: string,
		): Promise<MessageResponse.ReadChat>;

		/**
		 * Retrieves the current queue of outbound messages.
		 */
		showMessagesQueue(): Promise<Queue.QueueMessage[]>;

		/**
		 * Clears all messages from the outbound queue.
		 */
		clearMessagesQueue(): Promise<MessageResponse.ClearMessagesQueue>;

		/**
		 * Retrieves the latest incoming messages from the journal.
		 */
		lastIncomingMessages(): Promise<Journal.IncomingJournalMessage[]>;

		/**
		 * Retrieves the latest outgoing messages from the journal.
		 */
		lastOutgoingMessages(): Promise<Journal.OutgoingJournalMessage[]>;

		/**
		 * Retrieves the message history for a specific chat.
		 * @param chatId - The ID of the chat.
		 * @param count - The number of messages to retrieve.
		 */
		getChatHistory(
			chatId: string,
			count?: number,
		): Promise<Journal.JournalMessage[]>;

		/**
		 * Retrieves data of a specific message by its ID.
		 * @param chatId - The ID of the chat.
		 * @param idMessage - The ID of the message to retrieve.
		 */
		getMessage(
			chatId: string,
			idMessage: string,
		): Promise<MessageResponse.GetMessage>;

		/**
		 * Forwards a list of messages from one chat to another.
		 * @param chatId - The ID of the destination chat.
		 * @param chatIdFrom - The ID of the source chat.
		 * @param messages - An array of message IDs to forward.
		 */
		forwardMessages(
			chatId: string,
			chatIdFrom: string,
			messages: Array<string>,
		): Promise<MessageResponse.ForwardMessages>;

		/**
		 * Sends an interactive buttons message (Beta).
		 * Supports up to 3 buttons of types: copy, call, url.
		 */
		sendInteractiveButtons(params: {
			chatId: string;
			body: string;
			buttons: InteractiveButton[];
			header?: string;
			footer?: string;
		}): Promise<MessageResponse.Message>;

		/**
		 * Sends a reply-style interactive buttons message (Beta).
		 * Supports up to 3 simple reply buttons.
		 */
		sendInteractiveButtonsReply(params: {
			chatId: string;
			body: string;
			buttons: SimpleButton[];
			header?: string;
			footer?: string;
		}): Promise<MessageResponse.Message>;
	}

	class FileAPI {
		/**
		 * Sends a file from a specified URL to a chat.
		 * @param chatId - The ID of the target chat.
		 * @param phoneNumber - @deprecated Use chatId instead.
		 * @param urlFile - The direct URL to the file.
		 * @param fileName - The name to be assigned to the file.
		 * @param caption - Optional text caption for the file.
		 * @param options - Optional extra parameters.
		 */
		sendFileByUrl(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			urlFile: string,
			fileName: string,
			caption?: string,
			options?: SendFileByUrlOptions,
		): Promise<MessageResponse.Message>;

		/**
		 * Uploads a local file to the server and returns its URL.
		 * @param filePath - The local system path to the file.
		 */
		uploadFile(
			filePath: string,
		): Promise<FileResponse.UrlFileResponse>;

		/**
		 * Sends a file using a multipart/form-data upload.
		 * @param formData - The form data containing the file and message parameters.
		 */
		sendFileByUpload(
			formData: FormData,
		): Promise<FileResponse.SendFileByUpload>;

		/**
		 * Retrieves the download URL for a file from a specific message.
		 * @param chatId - The ID of the chat.
		 * @param idMessage - The ID of the message containing the file.
		 */
		downloadFile(
			chatId: string,
			idMessage: string,
		): Promise<FileResponse.UrlFileResponse>
	}

	class InstanceAPI {
		/**
		 * Retrieves the QR code for instance authorization.
		 */
		qr(): Promise<InstanceResponse.Qr>;

		/**
		 * Logs out the current authorized account from the instance.
		 */
		logout(): Promise<InstanceResponse.Logout>;

		/**
		 * Reboots the instance system.
		 */
		reboot(): Promise<InstanceResponse.Reboot>;

		/**
		 * Retrieves the current authorization state of the instance.
		 */
		getStateInstance(): Promise<InstanceResponse.GetStateInstance>;

		/**
		 * Retrieves information about the connected device.
		 */
		getDeviceInfo(): Promise<InstanceResponse.GetDeviceInfo>;

		/**
		 * Checks if a specific phone number is registered on WhatsApp.
		 * @param phoneNumber - The phone number to check.
		 */
		checkWhatsapp(
			phoneNumber: number,
		): Promise<InstanceResponse.CheckWhatsapp>;

		/**
		 * Generates an authorization pairing code for a phone number.
		 * @param phoneNumber - The phone number to authorize.
		 */
		getAuthorizationCode(
			phoneNumber: number,
		): Promise<InstanceResponse.GetAuthorizationCode>;

		/**
		 * Retrieves the avatar URL for a specific chat or user.
		 * @param chatId - The ID of the target chat.
		 * @param phoneNumber - @deprecated Use chatId instead.
		 */
		getAvatar(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
		): Promise<InstanceResponse.GetAvatar>;

		/**
		 * Moves a specific chat to the archive.
		 * @param chatId - The ID of the chat to archive.
		 */
		archiveChat(
			chatId: string,
		): Promise<void>;

		/**
		 * Restores a specific chat from the archive.
		 * @param chatId - The ID of the chat to unarchive.
		 */
		unarchiveChat(
			chatId: string,
		): Promise<void>

		/**
		 * Retrieves detailed information about a specific contact.
		 * @param chatId - The ID of the contact's chat.
		 */
		getContactInfo(
			chatId: string,
		): Promise<InstanceResponse.GetContactInfo>;

		/**
		 * Retrieves the complete list of contacts.
		 */
		getContacts(): Promise<InstanceResponse.Contact[]>;

		/**
		 * Retrieves the list of chats, sorted by activity.
		 * @param count - Optional number of chats to retrieve.
		 */
		getChats(count?: number): Promise<InstanceResponse.Chat[]>;

		/**
		 * Sends a typing or recording indicator to a chat.
		 * @param chatId - The ID of the target chat.
		 * @param typingTime - Duration in ms (1000–20000).
		 * @param typingType - Use "recording" for audio recording indicator.
		 */
		sendTyping(
			chatId: string,
			typingTime?: number,
			typingType?: "recording",
		): Promise<void>;

		/**
		 * Deletes a message from a chat.
		 * @param chatId - The ID of the chat.
		 * @param idMessage - The ID of the message to delete.
		 * @param onlySenderDelete - If true, deletes only for sender.
		 */
		deleteMessage(
			chatId: string,
			idMessage: string,
			onlySenderDelete?: boolean,
		): Promise<void>;

		/**
		 * Edits a previously sent text message (within 15 minutes of sending).
		 * @param chatId - The ID of the chat.
		 * @param idMessage - The ID of the message to edit.
		 * @param message - The new message text.
		 */
		editMessage(
			chatId: string,
			idMessage: string,
			message: string,
		): Promise<MessageResponse.Message>;

		/**
		 * Configures disappearing messages for a chat.
		 * @param chatId - The ID of the chat.
		 * @param ephemeralExpiration - Lifetime in seconds: 0 (off), 86400 (1d), 604800 (7d), 7776000 (90d).
		 */
		setDisappearingChat(
			chatId: string,
			ephemeralExpiration: 0 | 86400 | 604800 | 7776000,
		): Promise<InstanceResponse.SetDisappearingChat>;

		/**
		 * Sets a profile picture for the WhatsApp account.
		 * @param filePath - Path to a JPG image file.
		 */
		setProfilePicture(filePath: string): Promise<InstanceResponse.SetProfilePicture>;

		/**
		 * Generates a new API token for the instance (Beta).
		 */
		updateApiToken(): Promise<InstanceResponse.UpdateApiToken>;

		/**
		 * Returns WhatsApp account information for the authorized instance.
		 */
		getWaSettings(): Promise<InstanceResponse.GetWaSettings>;

		/**
		 * Returns the authorization state history of the instance.
		 * @param count - Number of records to retrieve (default 100).
		 */
		getStateInstanceHistory(count?: number): Promise<InstanceResponse.StateInstanceHistoryItem[]>;
	}

	class SettingsAPI {
		/**
		 * Retrieves the current settings configuration of the instance.
		 */
		getSettings(): Promise<Settings.GetSettings>;

		/**
		 * Updates the instance settings.
		 * @param settings - An object containing the settings to update.
		 */
		setSettings(
			settings: Partial<Settings.Settings>,
		): Promise<Settings.SetSettings>;
	}

	class GroupAPI {
		/**
		 * Creates a new group chat.
		 * @param groupName - The name of the new group.
		 * @param chatIds - An array of chat IDs to add as initial participants.
		 */
		createGroup(
			groupName: string,
			chatIds: Array<string>,
		): Promise<GroupResponse.CreateGroup>;

		/**
		 * Adds a new participant to an existing group.
		 * @param groupId - The ID of the group.
		 * @param participantChatId - The chat ID of the user to add.
		 * @param participantPhone - @deprecated Use participantChatId instead.
		 */
		addGroupParticipant(
			groupId: string,
			participantChatId: Optional<string>,
			participantPhone: Optional<string>,
		): Promise<GroupResponse.AddGroupParticipant>;

		/**
		 * Retrieves data and metadata for a specific group.
		 * @param groupId - The ID of the group.
		 */
		getGroupData(
			groupId: string,
		): Promise<GroupResponse.GetGroupData>;

		/**
		 * Removes a participant from a group.
		 * @param groupId - The ID of the group.
		 * @param participantChatId - The chat ID of the user to remove.
		 * @param participantPhone - @deprecated Use participantChatId instead.
		 */
		removeGroupParticipant(
			groupId: string,
			participantChatId: Optional<string>,
			participantPhone: Optional<string>,
		): Promise<GroupResponse.RemoveGroupParticipant>;

		/**
		 * Updates the name of an existing group.
		 * @param groupId - The ID of the group.
		 * @param groupName - The new name for the group.
		 */
		updateGroupName(
			groupId: string,
			groupName: string,
		): Promise<GroupResponse.UpdateGroupName>;

		/**
		 * Promotes a group participant to administrator.
		 * @param groupId - The ID of the group.
		 * @param participantChatId - The chat ID of the user to promote.
		 * @param participantPhone - @deprecated Use participantChatId instead.
		 */
		setGroupAdmin(
			groupId: string,
			participantChatId: Optional<string>,
			participantPhone?: number,
		): Promise<GroupResponse.SetGroupAdmin>;

		/**
		 * Demotes an administrator back to a regular participant.
		 * @param groupId - The ID of the group.
		 * @param participantChatId - The chat ID of the admin to demote.
		 * @param participantPhone - @deprecated Use participantChatId instead.
		 */
		removeAdmin(
			groupId: string,
			participantChatId: Optional<string>,
			participantPhone?: number,
		): Promise<GroupResponse.RemoveAdmin>;

		/**
		 * Leaves a specific group chat.
		 * @param groupId - The ID of the group to leave.
		 */
		leaveGroup(
			groupId: string,
		): Promise<GroupResponse.LeaveGroup>;

		/**
		 * Updates the profile picture of a group.
		 * @param groupId - The ID of the group.
		 * @param filePath - The local system path to the new image file.
		 */
		setGroupPicture(
			groupId: string,
			filePath: string,
		): Promise<GroupResponse.SetGroupPicture>;
	}

	class ContactsAPI {
		/**
		 * Adds a new contact.
		 * @param chatId - Phone number in chat ID format (79876543210@c.us).
		 * @param firstName - Contact first name.
		 * @param lastName - Optional last name.
		 * @param saveInAddressbook - Whether to save to device address book (default true).
		 */
		addContact(
			chatId: string,
			firstName: string,
			lastName?: string,
			saveInAddressbook?: boolean,
		): Promise<ContactResponse.AddContact>;

		/**
		 * Edits an existing contact.
		 * @param chatId - Phone number in chat ID format (79876543210@c.us).
		 * @param firstName - New first name.
		 * @param lastName - Optional new last name.
		 * @param saveInAddressbook - Whether to save to device address book (default true).
		 */
		editContact(
			chatId: string,
			firstName: string,
			lastName?: string,
			saveInAddressbook?: boolean,
		): Promise<ContactResponse.EditContact>;

		/**
		 * Deletes a contact.
		 * @param chatId - Phone number in chat ID format (79876543210@c.us).
		 */
		deleteContact(chatId: string): Promise<ContactResponse.DeleteContact>;
	}

	namespace MessageResponse {
		interface Message {
			idMessage: string;
		}

		interface ReadChat {
			setRead: boolean;
		}

		interface ClearMessagesQueue {
			isCleared: boolean;
		}

		interface GetMessage {
			message: Journal.JournalMessage;
		}

		interface ForwardMessages {
			messages: Array<string>;
		}
	}

	namespace FileResponse {
		interface UrlFileResponse {
			urlFile: string;
		}

		interface SendFileByUpload {
			idMessage: string;
			urlFile: string;
		}
	}

	namespace InstanceResponse {
		interface Qr {
			type: string;
			message: string;
		}

		interface Logout {
			isLogout: boolean;
		}

		interface Reboot {
			isReboot: boolean;
		}

		interface GetStateInstance {
			stateInstance: Common.InstanceState;
		}

		interface GetDeviceInfo {
			platform: string;
			deviceManufacturer: string;
			deviceModel: string;
			osVersion: string;
			waVersion: string;
			battery: number;
		}

		interface CheckWhatsapp {
			existsWhatsapp: boolean;
		}

		interface GetAuthorizationCode {
			status: boolean;
			code: string;
		}

		interface GetAvatar {
			urlAvatar: string;
			available: boolean;
		}

		interface GetContactInfo {
			avatar: string;
			name: string;
			contactName: string;
			email: string;
			category: string;
			description: string;
			products: {
				id: string;
				imageUrls: {
					requested: string;
					original: string;
				};
				reviewStatus: {
					whatsapp: string;
				};
				availability: string;
				name: string;
				description?: string;
				price: string | null;
				isHidden: boolean;
			}[];
			chatId: string;
			lastSeen: string;
			isArchive: boolean;
			isDisappearing: boolean;
			isMute: boolean;
			messageExpiration: number;
			muteExpiration: number;
			isBusiness: boolean;
		}

		interface Contact {
			id: string;
			name: string;
			type: "user" | "group";
			contactName: string;
		}

		interface Chat {
			archive: boolean;
			id: string;
			name: string;
			type: "user" | "group";
			ephemeralExpiration: number;
			ephemeralSettingTimestamp: number;
		}

		interface SetDisappearingChat {
			chatId: string;
			disappearingMessagesInChat: boolean;
			ephemeralExpiration: number;
		}

		interface SetProfilePicture {
			setProfilePicture: boolean;
			urlAvatar: string;
			reason: string | null;
		}

		interface UpdateApiToken {
			apiTokenInstance: string;
		}

		interface GetWaSettings {
			avatar: string;
			base64Avatar: string;
			chatId: string;
			phone: number;
			historySyncProgress: number;
			stateInstance: Common.InstanceState;
			suspendedUntil?: number;
			deviceId: string;
			logoutProcess: boolean;
		}

		interface StateInstanceHistoryItem {
			stateInstance: "notAuthorized" | "authorized" | "blocked";
			timestamp: number;
			phoneNumber: number;
		}
	}

	namespace ContactResponse {
		interface AddContact {
			addContact?: boolean;
			message?: string;
		}

		interface EditContact {
			editContact?: boolean;
			message?: string;
		}

		interface DeleteContact {
			deleteContact?: boolean;
			message?: string;
		}
	}

	namespace Settings {
		interface Settings {
			wid: string;
			countryInstance: string;
			typeAccount: string;
			webhookUrl: string;
			webhookUrlToken: string;
			delaySendMessagesMilliseconds: number;
			markIncomingMessagesReaded: YesOrNo;
			markIncomingMessagesReadedOnReply: YesOrNo;
			sharedSession: YesOrNo;
			outgoingWebhook: YesOrNo;
			outgoingMessageWebhook: YesOrNo;
			outgoingAPIMessageWebhook: YesOrNo;
			incomingWebhook: YesOrNo;
			deviceWebhook: YesOrNo;
			statusInstanceWebhook: YesOrNo;
			stateWebhook: YesOrNo;
			enableMessagesHistory: YesOrNo;
			keepOnlineStatus: YesOrNo;
			pollMessageWebhook: YesOrNo;
			incomingBlockWebhook: YesOrNo;
			incomingCallWebhook: YesOrNo;
			editedMessageWebhook: YesOrNo;
			deletedMessageWebhook: YesOrNo;
			autoTyping?: number;
			linkPreview?: YesOrNo;
			enableLidMode?: YesOrNo;
		}

		type GetSettings = Settings;

		interface SetSettings {
			saveSettings: boolean;
		}
	}

	namespace GroupResponse {
		interface CreateGroup {
			created: boolean;
			chatId: string;
			groupInviteLink: string;
		}

		interface AddGroupParticipant {
			addParticipant: boolean;
		}

		interface GetGroupData {
			groupId: string;
			owner: string;
			subject: string;
			creation: number;
			participants: {
				id: string;
				isAdmin: boolean;
				isSuperAdmin: boolean;
			}[];
			subjectTime: number;
			subjectOwner: string;
			groupInviteLink: string;
		}

		interface RemoveGroupParticipant {
			removeParticipant: boolean;
		}

		interface UpdateGroupName {
			updateGroupName: boolean;
		}

		interface SetGroupAdmin {
			setGroupAdmin: boolean;
		}

		interface RemoveAdmin {
			removeAdmin: boolean;
		}

		interface LeaveGroup {
			leaveGroup: boolean;
			removeAdmin: boolean;
		}

		interface SetGroupPicture {
			setGroupPicture: boolean;
			urlAvatar: string;
			reason: string;
		}
	}
	namespace WebhookResponse {
		interface Notification {
			receiptId: number;
			body: MessageWebhook | OutgoingMessageStatusWebhook | StateInstanceWebhook;
		}

		interface DeleteNotification {
			result: boolean;
		}

		type MessageData = {
			typeMessage: Common.MessageType;
			quotedMessage?: Message.QuotedMessage;
		} & (
			| { typeMessage: "textMessage"; textMessageData: Message.TextMessageData }
			| { typeMessage: "extendedTextMessage"; extendedTextMessageData: Message.ExtendedTextMessageData }
			| {
			typeMessage: "imageMessage" | "videoMessage" | "documentMessage" | "audioMessage";
			fileMessageData: Message.FileMessageData
		}
			| { typeMessage: "locationMessage"; locationMessageData: Message.LocationMessageData }
			| { typeMessage: "contactMessage"; contactMessageData: Message.ContactMessageData }
			| { typeMessage: "pollMessage"; pollMessageData: Message.PollMessageData }
			| { typeMessage: "pollUpdateMessage"; pollMessageData: Message.PollUpdateMessageData }
			);

		interface MessageWebhook {
			typeWebhook: "incomingMessageReceived" | "outgoingMessageReceived" | "outgoingAPIMessageReceived";
			instanceData: Common.InstanceData;
			timestamp: number;
			idMessage: string;
			senderData: {
				chatId: string;
				sender: string;
				chatName: string;
				senderName: string;
				senderContactName?: string;
			};
			messageData: MessageData;
		}

		interface OutgoingMessageStatusWebhook {
			typeWebhook: "outgoingMessageStatus";
			chatId: string;
			instanceData: Common.InstanceData;
			timestamp: number;
			idMessage: string;
			status: Common.OutgoingMessageStatus;
			description?: string;
			sendByApi: boolean;
		}

		interface StateInstanceWebhook {
			typeWebhook: "stateInstanceChanged";
			instanceData: Common.InstanceData;
			timestamp: number;
			stateInstance: Common.InstanceState;
		}
	}

	class WebhookServiceAPI {
		readonly noteTypes: {
			readonly incomingMessageReceived: "incomingMessageReceived";
			readonly outgoingMessageStatus: "outgoingMessageStatus";
			readonly stateInstanceChanged: "stateInstanceChanged";
			readonly deviceInfo: "deviceInfo";
		};

		readonly callbackTypes: {
			readonly onReceivingMessageText: "onReceivingMessageText";
			readonly onReceivingMessageImage: "onReceivingMessageImage";
			readonly onReceivingMessageVideo: "onReceivingMessageVideo";
			readonly onReceivingMessageDocument: "onReceivingMessageDocument";
			readonly onReceivingMessageAudio: "onReceivingMessageAudio";
			readonly onReceivingOutboundMessageStatus: "onReceivingOutboundMessageStatus";
			readonly onReceivingAccountStatus: "onReceivingAccountStatus";
			readonly onReceivingDeviceStatus: "onReceivingDeviceStatus";
			readonly onReceivingMessageTextURL: "onReceivingMessageTextURL";
			readonly onReceivingMessageContact: "onReceivingMessageContact";
			readonly onReceivingMessageLocation: "onReceivingMessageLocation";
		};

		receiveNotification(): Promise<WebhookResponse.Notification>;

		deleteNotification(receiptId: number): Promise<WebhookResponse.DeleteNotification>;

		startReceivingNotifications(): Promise<void>;

		stopReceivingNotifications(): Promise<void>;

		onReceivingMessageText(callback: (data: WebhookResponse.MessageWebhook & {
			messageData: { typeMessage: "textMessage" }
		}) => void): void;

		onReceivingMessageImage(callback: (data: WebhookResponse.MessageWebhook & {
			messageData: { typeMessage: "imageMessage" }
		}) => void): void;

		onReceivingMessageVideo(callback: (data: WebhookResponse.MessageWebhook & {
			messageData: { typeMessage: "videoMessage" }
		}) => void): void;

		onReceivingMessageDocument(callback: (data: WebhookResponse.MessageWebhook & {
			messageData: { typeMessage: "documentMessage" }
		}) => void): void;

		onReceivingMessageAudio(callback: (data: WebhookResponse.MessageWebhook & {
			messageData: { typeMessage: "audioMessage" }
		}) => void): void;

		onReceivingOutboundMessageStatus(callback: (data: WebhookResponse.OutgoingMessageStatusWebhook) => void): void;

		onReceivingAccountStatus(callback: (data: WebhookResponse.StateInstanceWebhook) => void): void;

		onReceivingDeviceStatus(callback: (data: WebhookResponse.MessageWebhook) => void): void;

		onReceivingMessageTextURL(callback: (data: WebhookResponse.MessageWebhook & {
			messageData: { typeMessage: "extendedTextMessage" }
		}) => void): void;

		onReceivingMessageContact(callback: (data: WebhookResponse.MessageWebhook & {
			messageData: { typeMessage: "contactMessage" }
		}) => void): void;

		onReceivingMessageLocation(callback: (data: WebhookResponse.MessageWebhook & {
			messageData: { typeMessage: "locationMessage" }
		}) => void): void;
	}

	class StatusAPI {
		sendTextStatus(
			message: string,
			backgroundColor?: string,
			font?: string,
			participants?: string[]
		): Promise<any>;

		sendVoiceStatus(
			urlFile: string,
			fileName: string,
			backgroundColor?: string,
			participants?: string[]
		): Promise<any>;

		sendMediaStatus(
			urlFile: string,
			fileName: string,
			caption?: string,
			participants?: string[]
		): Promise<any>;

		getOutgoingStatuses(
			minutes?: number
		): Promise<any>;

		getIncomingStatuses(
			minutes?: number
		): Promise<any>;

		getStatusStatistic(
			idMessage: string
		): Promise<any>;

		deleteStatus(
			idMessage: string
		): Promise<any>;
	}
}
