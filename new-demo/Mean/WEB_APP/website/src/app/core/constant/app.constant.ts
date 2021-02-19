/*
Other Person: N/A
Date: 27-1-2019
Description: Following is used to all constants of API(url)
*/

import { environment } from './../../../environments/environment';

export class AppConst {

    private static appurl = environment.apiBaseUrl;

    public static get LOGIN(): string { return this.appurl + 'userLogin' };
    public static get SIGNUPCONTINUE(): string { return this.appurl + 'signupContinue' };
    public static get getPlanList(): string { return this.appurl + 'getPlanList' };
    public static get FORGET(): string { return this.appurl + 'userForgotPassword' };
    public static get RESETPASSWORD(): string { return this.appurl + 'resetPassword' };
    public static get loggedin(): string { return this.appurl + 'loggedin' };


    //channel module
    public static get GETUSERCHANNELLIST(): string { return this.appurl + 'getUserChannelsList' };
    public static get REMOVESOCIALPROFILE(): string { return this.appurl + 'removeSocialProfile' };
    public static get SWITCHSOCIALACCOUNT(): string { return this.appurl + 'switchSocialAccType' };
    public static get GETFBPAGES(): string { return this.appurl + 'getFBPages' };
    public static get CONNECTFBPAGE(): string { return this.appurl + 'connectFBPage' };
    public static get DISCONNECTFBPAGE(): string { return this.appurl + 'disConnectFBPage' };
    public static get GETIGFBPAGES(): string { return this.appurl + 'getIGFBPages' };
    public static get CONNECTIGFBPAGE(): string { return this.appurl + 'connectIGFBPage' };

    public static get getUserList(): string { return this.appurl + 'users/getUserList' };
    public static get getUserFbData(): string { return this.appurl + 'users/getUserFbData' };
    public static get getUserFbPages(): string { return this.appurl + 'getUserFbPages' };
    public static get getUserFbInboxs(): string { return this.appurl + 'users/getUserFbInboxs' };
    public static get getUserFbPostedData(): string { return this.appurl + 'users/getUserFbPostedData' };
    public static get getPerByUserOrgId(): string { return this.appurl + 'users/getPerByUserOrgId' };
    public static get updateUserPermission(): string { return this.appurl + 'users/updateUserPermission' };
    public static get deleteUserByUserOrgId(): string { return this.appurl + 'users/deleteUserByUserOrgId' };

    public static get getUserByUserOrgId(): string { return this.appurl + 'users/getUserByUserOrgId' };
    public static get updateUser(): string { return this.appurl + 'users/updateUser' };
    public static get getDesignation(): string { return this.appurl + 'users/getDesignation' };
    public static get setUserAccess(): string { return this.appurl + 'users/setUserAccess' };
    public static get getFrontPlanList(): string { return this.appurl + 'getFrontPlanList' };
    public static get getUserToken(): string { return this.appurl + 'getUserToken' };
    public static get userRegister(): string { return this.appurl + 'userRegister' };
    public static get geFBMetricsBypageLikes(): string { return this.appurl + 'geFBMetricsBypageLikes' };
    public static get geFBMetricsBypageUnlikes(): string { return this.appurl + 'geFBMetricsBypageUnlikes' };
    public static get getIG_Follower_Profile(): string { return this.appurl + 'getIG_Follower_Profile' };
    public static get getMetrixByMediaRecentIG(): string { return this.appurl + 'getMetrixByMediaRecentIG' };
    public static get connectTwitterProfile(): string { return this.appurl + 'connectTwitterProfile' };
    public static get connectFacebookProfile(): string { return this.appurl + 'connectFacebookProfile' };
    public static get connectInstagramProfile(): string { return this.appurl + 'connectInstagramProfile' };
    public static get getInviteUser(): string { return this.appurl + 'getInviteUser' };
    public static get updateCompleteRegister(): string { return this.appurl + 'updateCompleteRegister' };



    public static get getChannelList(): string { return this.appurl + 'getChannelList' };

    // Twitter Metrics
    public static get getTWChannelsList(): string { return this.appurl + 'getTWChannelsList' };
    public static get getTWMetricsByUsersDtl(): string { return this.appurl + 'getTWMetricsByUsersDtl' };

    //Facebook Metrics
    public static get getFBChannelsList(): string { return this.appurl + 'getFBChannelsList' };
    public static get getFBMetricsTab1(): string { return this.appurl + 'getFBMetricsTab1' };

    //Instagram Metrics
    public static get getIGChannelsList(): string { return this.appurl + 'getIGChannelsList' };
    public static get getIGInsightsFollower(): string { return this.appurl + 'getIGInsightsFollower' };

    //Schedule post
    public static get listMedia(): string { return this.appurl + 'listMedia' };
    public static get publishFeed(): string { return this.appurl + 'publishFeed' };
    public static get getURLdata(): string { return this.appurl + 'getURLdata' };
    //Scheduled post
    public static get getScheduledList(): string { return this.appurl + 'getScheduledList' };
    public static get editScheduledFeed(): string { return this.appurl + 'editScheduledFeed' };
    public static get getUserChannelsList(): string { return this.appurl + 'getUserChannelsList' };
    public static get getScheduleCampaign(): string { return this.appurl + 'getScheduleCampaign' };
    public static get getScheduleTask(): string { return this.appurl + 'getScheduleTask' };
    public static get getScheduleProject(): string { return this.appurl + 'getScheduleProject' };
    public static get editTaskDate(): string { return this.appurl + 'changeDueDate' };


    //shedule-post module
    public static get getScheuleList(): string { return this.appurl + 'getScheuleList' };
    public static get deleteShedulePost(): string { return this.appurl + 'deleteSchedule' };
    public static get getUserListAll(): string { return this.appurl + 'users/getUserListAll' };
    public static get getScheuleDetail(): string { return this.appurl + 'getScheuleDetail' };

    //library module
    public static get getListMedia(): string { return this.appurl + 'listMedia' };
    public static get createFolder(): string { return this.appurl + 'createFolder' };
    public static get deleteFolder(): string { return this.appurl + 'deleteFolder' };
    public static get renameFolder(): string { return this.appurl + 'renameFolder' };
    public static get deleteFile(): string { return this.appurl + 'deleteFile' };
    public static get renameFile(): string { return this.appurl + 'renameFile' };
    public static get downloadFolder(): string { return this.appurl + 'downloadFolder' };
    public static get getShareUnshareUserList(): string { return this.appurl + 'getShareUnshareUserList' };
    public static get shareFolder(): string { return this.appurl + 'shareFolder' };
    public static get downloadFiles(): string { return this.appurl + 'downloadFiles' };
    public static get moveFile(): string { return this.appurl + 'moveFile' };

    //planit
    public static get getUserIGChannelsList(): string { return this.appurl + 'getUserIGChannelsList' };
    public static get getPlanitList(): string { return this.appurl + 'getPlanitList' };
    public static get getScheuleIGPreviewList(): string { return this.appurl + 'getScheuleIGPreviewList' };
    public static get uploadLibIGMedia(): string { return this.appurl + 'uploadLibIGMedia' };
    public static get removeIGMedia(): string { return this.appurl + 'removeIGMedia' };
    public static get getMediaEditNew(): string { return this.appurl + 'getMediaEditNew' };
    public static get updateIGMediaIndex(): string { return this.appurl + 'updateIGMediaIndex' };

    //User Profile 
    public static get getTimezoneList(): string { return this.appurl + 'getTimezoneList' };
    public static get getWorkspaceWithEmail(): string { return this.appurl + 'getWorkspaceWithEmail' };
    public static get getNotifySetting(): string { return this.appurl + 'getNotifySetting' };
    public static get getUserOrgList(): string { return this.appurl + 'getUserOrgList' };
    public static get getMembers(): string { return this.appurl + 'getMembers' };
    public static get getOrgConsent(): string { return this.appurl + 'getOrgConsent' };
    public static get updateProfile(): string { return this.appurl + 'updateProfile' };
    public static get uploadImage(): string { return this.appurl + 'uploadImage' };
    public static get changePassword(): string { return this.appurl + 'changePassword' };
    public static get updateLinkEmail(): string { return this.appurl + 'updateLinkEmail' };
    public static get sendWorkspaceInvite(): string { return this.appurl + 'sendWorkspaceInvite' };
    public static get updateNotificationPerm(): string { return this.appurl + 'users/updateNotificationPerm' };
    public static get forgetMe(): string { return this.appurl + 'forgetMe' };
    public static get getExportData(): string { return this.appurl + 'getExportData' };
    public static get removeOrgConsent(): string { return this.appurl + 'removeOrgConsent' };

    //Notification services
    public static get getUnreadNotificationCount(): string { return this.appurl + 'getUnreadNotificationCount' };
    public static get getNotificationList(): string { return this.appurl + 'getNotificationList' };
    public static get readNotification(): string { return this.appurl + 'readNotification' };
    public static get getAllNotificationList(): string { return this.appurl + 'getAllNotificationList' };
    public static get deleteNotification(): string { return this.appurl + 'deleteNotification' };
    public static get setOrganization(): string { return this.appurl + 'users/setOrganization' };


    //workspace setting
    public static get updateOrgData(): string { return this.appurl + 'users/updateOrgData' };
    public static get getInviteUserList(): string { return this.appurl + 'users/getInviteUserList' };
    public static get inviteUser(): string { return this.appurl + 'users/inviteUser' };
    public static get cancelInviteByUserOrgId(): string { return this.appurl + 'users/cancelInviteByUserOrgId' };
    public static get removeUserFromOrg(): string { return this.appurl + 'users/removeUserFromOrg' };
    public static get createOrg(): string { return this.appurl + 'users/createOrg' };
    public static get checkDowngradePlan(): string { return this.appurl + 'checkDowngradePlan' };
    public static get upgradePlan(): string { return this.appurl + 'upgradePlan' };
    public static get getAccountDetail(): string { return this.appurl + 'getAccountDetail' };
    public static get deleteCreditCard(): string { return this.appurl + 'deleteCreditCard' };
    public static get setCardDefault(): string { return this.appurl + 'setCardDefault' };
    public static get addCreditCard(): string { return this.appurl + 'addCreditCard' };
    public static get getTransaction(): string { return this.appurl + 'getTransaction' };
    public static get invoiceDetail(): string { return this.appurl + 'invoiceDetail' };

    //Task
    public static get listActiveProject(): string { return this.appurl + 'listActiveProject' };
    public static get getUserOrganization(): string { return this.appurl + 'getUserOrganization' };
    public static get canEditPermission(): string { return this.appurl + 'canEditPermission' };
    public static get addTask(): string { return this.appurl + 'addTask' };
    public static get searchTask(): string { return this.appurl + 'searchTask' };
    public static get taskDetail(): string { return this.appurl + 'taskDetail' };
    public static get editTask(): string { return this.appurl + 'editTask' };
    public static get addComment(): string { return this.appurl + 'addComment' };
    public static get updateComment(): string { return this.appurl + 'updateComment' };
    public static get deleteTaskComment(): string { return this.appurl + 'deleteTaskComment' };
    public static get changeStatus(): string { return this.appurl + 'changeStatus' };
    public static get listProject(): string { return this.appurl + 'listProject' };
    public static get addProject(): string { return this.appurl + 'addProject' };
    public static get deleteTask(): string { return this.appurl + 'deleteTask' };
    public static get projectDetail(): string { return this.appurl + 'projectDetail' };
    public static get editProject(): string { return this.appurl + 'editProject' };
    public static get deleteProject(): string { return this.appurl + 'deleteProject' };
    public static get changeProjectStatus(): string { return this.appurl + 'changeProjectStatus' };
    public static get getTaskByCampaignId(): string { return this.appurl + 'getTaskByCampaignId' };
};