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
        options: Array<object>,
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
        contact: {phoneContact: number, firstName: Optional<string>, middleName: Optional<string>,lastName: Optional<string>, company: Optional<string>},
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

      showMessagesQueue(): Promise<any>;

      clearMessagesQueue(): Promise<MessageResponse.ClearMessagesQueue>;

      lastIncomingMessages(): Promise<any>;

      lastOutgoingMessages(): Promise<any>;

      getChatHistory(
        chatId: string,
        count?: number,
      ): Promise<any>;

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
        phoneNumber: Optional<number>
      ): Promise<InstanceResponse.GetAvatar>;

      archiveChat(
        chatId: string,
      ): Promise<void>;

      unarchiveChat(
        chatId: string,
      ): Promise<void>

      getContactInfo(
        chatId: string
      ): Promise<InstanceResponse.GetContactInfo>;

      getContacts(): Promise<any>;

    }

    class SettingsAPI {
      getSettings(): Promise<SettingsResponse.GetSettings>;

      setSettings(
        settings: object,
      ): Promise<SettingsResponse.SetSettings>;

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
        message: object;
      }
      interface ForwardMessages{
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
        stateInstance: string;
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
        products: object;
        chatId: string;
        lastSeen: string;
        isArchive: boolean;
        isDisappearing: boolean;
        isMute: boolean;
        messageExpiration: number;
        muteExpiration: number;
        isBusiness: boolean;
      }
    }

    namespace SettingsResponse {
      interface GetSettings {
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
      }
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
        participants: Array<object>;
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
  }