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
			| "yellowCard";

		type OutgoingMessageStatus =
			| "sent"
			| "delivered"
			| "read"
			| "failed"
			| "noAccount"
			| "notInGroup"
			| "yellowCard";

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

	class MessageApi {
		sendMessage(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			message: string,
			quotedMessageId?: string,
			linkPreview?: boolean,
		): Promise<MessageResponse.Message>;

		sendPoll(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			message: string,
			options: Message.PollOption[],
			multipleAnswers?: boolean,
			quotedMessageId?: string,
		): Promise<MessageResponse.Message>;

		sendLocation(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			nameLocation: Optional<string>,
			address: Optional<string>,
			latitude: number,
			longitude: number,
		): Promise<MessageResponse.Message>;

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

		sendLink(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			urlLink: string,
		): Promise<MessageResponse.Message>

		readChat(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			idMessage?: string,
		): Promise<MessageResponse.ReadChat>;

		showMessagesQueue(): Promise<Queue.QueueMessage[]>;

		clearMessagesQueue(): Promise<MessageResponse.ClearMessagesQueue>;

		lastIncomingMessages(): Promise<Journal.IncomingJournalMessage[]>;

		lastOutgoingMessages(): Promise<Journal.OutgoingJournalMessage[]>;

		getChatHistory(
			chatId: string,
			count?: number,
		): Promise<Journal.JournalMessage[]>;

		getMessage(
			chatId: string,
			idMessage: string,
		): Promise<MessageResponse.GetMessage>;

		forwardMessages(
			chatId: string,
			chatIdFrom: string,
			messages: Array<string>,
		): Promise<MessageResponse.ForwardMessages>;
	}

	class FileAPI {
		sendFileByUrl(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
			urlFile: string,
			fileName: string,
			caption?: string,
		): Promise<MessageResponse.Message>;

		uploadFile(
			filePath: string,
		): Promise<FileResponse.UrlFileResponse>;

		sendFileByUpload(
			formData: FormData,
		): Promise<FileResponse.SendFileByUpload>;

		downloadFile(
			chatId: string,
			idMessage: string,
		): Promise<FileResponse.UrlFileResponse>
	}

	class InstanceAPI {
		qr(): Promise<InstanceResponse.Qr>;

		logout(): Promise<InstanceResponse.Logout>;

		reboot(): Promise<InstanceResponse.Reboot>;

		getStateInstance(): Promise<InstanceResponse.GetStateInstance>;

		getDeviceInfo(): Promise<InstanceResponse.GetDeviceInfo>;

		checkWhatsapp(
			phoneNumber: number,
		): Promise<InstanceResponse.CheckWhatsapp>;

		getAuthorizationCode(
			phoneNumber: number,
		): Promise<InstanceResponse.GetAuthorizationCode>;

		getAvatar(
			chatId: Optional<string>,
			phoneNumber: Optional<number>,
		): Promise<InstanceResponse.GetAvatar>;

		archiveChat(
			chatId: string,
		): Promise<void>;

		unarchiveChat(
			chatId: string,
		): Promise<void>

		getContactInfo(
			chatId: string,
		): Promise<InstanceResponse.GetContactInfo>;

		getContacts(): Promise<InstanceResponse.Contact[]>;

	}

	class SettingsAPI {
		getSettings(): Promise<Settings.GetSettings>;

		setSettings(
			settings: Partial<Settings.Settings>,
		): Promise<Settings.SetSettings>;
	}

	class GroupAPI {
		createGroup(
			groupName: string,
			chatIds: Array<string>,
		): Promise<GroupResponse.CreateGroup>;

		addGroupParticipant(
			groupId: string,
			participantChatId: Optional<string>,
			participantPhone: Optional<string>,
		): Promise<GroupResponse.AddGroupParticipant>;

		getGroupData(
			groupId: string,
		): Promise<GroupResponse.GetGroupData>;

		removeGroupParticipant(
			groupId: string,
			participantChatId: Optional<string>,
			participantPhone: Optional<string>,
		): Promise<GroupResponse.RemoveGroupParticipant>;

		updateGroupName(
			groupId: string,
			groupName: string,
		): Promise<GroupResponse.UpdateGroupName>;

		setGroupAdmin(
			groupId: string,
			participantChatId: Optional<string>,
			participantPhone?: number,
		): Promise<GroupResponse.SetGroupAdmin>;

		removeAdmin(
			groupId: string,
			participantChatId: Optional<string>,
			participantPhone?: number,
		): Promise<GroupResponse.RemoveAdmin>;

		leaveGroup(
			groupId: string,
		): Promise<GroupResponse.LeaveGroup>;

		setGroupPicture(
			groupId: string,
			filePath: string,
		): Promise<GroupResponse.SetGroupPicture>;
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
}
