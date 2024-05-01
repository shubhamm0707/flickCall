/** @define {boolean} */
var IS_SAFARI_ITP = false;
(function () {
  VWO.v_t = "7.0.257-505-gdff6df021";
  /* Track lib */
  (function () {
    var waitForCondition = function (condition, callback) {
      var execute = function () {
        if (condition()) {
          callback();
        } else {
          setTimeout(execute, 100);
        }
      };
      execute();
    };
    waitForCondition(
      function () {
        return VWO && VWO._ && VWO._.libLoaded;
      },
      function () {
        (function () {
          "use strict";

          var constants = {
            TRACK_PAGE_COOKIE_NAME: "_vwo_p",
            FUNNEL_EXPIRY: 100,
            INITIAL_PRICING_VERSION: 0,
            FEATURE_BUCKET_INDEX: 1,
            SAMPLING_VERSION_INDEX: 2,
            TRACK_GLOBAL_COOKIE_EXPIRY_STATE_INDEX: 3,
            FUNNEL_INFORMATION_INDEX: 2,
            GOAL_INFORMATION_INDEX: 3,
            ANALYZE_INFORMATION_INDEX: 4,
            CRO_START_TIMESTAMP_INDEX: 5,
            PAGE_ID_INFORMATION_INDEX: 1,
            ANALYSE_SERVER_NAME_INDEX: 2,
            TRACK_PAGE_ID_INFORMATION_INDEX: 3,
          };
          VWO._.commonUtil.extend(constants, VWO._.CookieEnum);

          var commonUtil = VWO._.commonUtil;
          var data = {
            analyze: {},
          };
          var i = 0;
          var getAnalyzeInformation = function () {
              var globalCookieValue = cookieHandler.getDataStore(),
                analyzeExpData = {};
              if (globalCookieValue) {
                var analyzeInformation =
                  globalCookieValue.split(":")[
                    constants.ANALYZE_INFORMATION_INDEX
                  ];
                analyzeExpData = getObjectFromString(analyzeInformation);
              }
              return analyzeExpData;
            },
            writeDataInCookie = function () {
              var dataStore = cookieHandler.getDataStore();
              if (!dataStore) {
                return;
              }
              dataStore = dataStore.split(":");
              dataStore[constants.ANALYZE_INFORMATION_INDEX] =
                getStringFromObject(data.analyze);
              cookieHandler.setDataStore(dataStore.join(":"));
            },
            getStringFromObject = function (obj) {
              var keys = commonUtil.getKeys(obj),
                keysLength = keys.length,
                str = "";
              while (keysLength--) {
                str +=
                  keys[keysLength] +
                  "_" +
                  obj[keys[keysLength]] +
                  (keysLength === 0 ? "" : ",");
              }
              return str;
            },
            getObjectFromString = function (str) {
              var obj = {},
                info,
                key,
                value;
              if (!str) {
                return obj;
              }
              str = str.split(",");
              for (i = 0; i < str.length; i++) {
                info = str[i].split("_");
                key = info[0];
                value = info[1];
                obj[key] = value;
              }
              return obj;
            };
          var cookieHandler = {
            init: function () {
              data.analyze = getAnalyzeInformation();
              if (window.VWO.data.isUsingSamplingRules) {
                data.analyze = {};
              }
            },
            includeAnalyzeCampaign: function (id) {
              data.analyze[id] = "1";
              writeDataInCookie();
            },
            excludeAnalyzeCampaign: function (id) {
              data.analyze[id] = "0";
              writeDataInCookie();
            },
            isAnalyzeCampaignIncluded: function (id) {
              if (data.analyze[id] === "1" || data.analyze[id] === 1) {
                return "1";
              }
            },
            isAnalyzeCampaignExcluded: function (id) {
              return data.analyze[id] === "0" || data.analyze[id] === 0;
            },
          };
          let ENABLE_TESTING = false;
          if (ENABLE_TESTING) {
            cookieHandler.getData = function () {
              return data;
            };
            cookieHandler.setData = function (value) {
              data = value;
            };
          }
          VWO._.commonUtil.extend(cookieHandler, VWO._.commonCookieHandler);

          var _a;
          var sessionCookieExpiry =
            VWO.TRACK_SESSION_COOKIE_EXPIRY_CUSTOM || 1 / 48;
          var globalCookieExpiry =
            VWO.TRACK_GLOBAL_COOKIE_EXPIRY_CUSTOM || window.VWO.data.rp || 90;
          var cookiePrefix1 = "_vis_opt_";
          var cookiePrefix2 = "_vwo_";
          var CookieEnum = {
            TRACK_GLOBAL_COOKIE_NAME: "_vwo_ds",
            TRACK_SESSION_COOKIE_NAME: "_vwo_sn",
            TRACK_SESSION_COOKIE_EXPIRY: sessionCookieExpiry,
            TRACK_GLOBAL_COOKIE_EXPIRY: Math.min(globalCookieExpiry, 90),
            SESSION_TIMER_EXPIRE: sessionCookieExpiry * 60 * 60 * 1000 * 24,
            COOKIE_VERSION: 3,
            COOKIE_TS_INDEX: 1,
            COOKIE_VERSION_INDEX: 0,
            FIRST_SESSION_ID_INDEX: 0,
            PC_TRAFFIC_INDEX: 1,
            RELATIVE_SESSION_ID_INDEX: 0,
            PAGE_ID_INFORMATION_INDEX: 1,
            SESSION_SYNCED_STATE_INDEX: 4,
            PAGE_ID_EXPIRY: 15,
            GLOBAL_OPT_OUT: "_vwo_global_opt_out",
            OPT_OUT: "_vis_opt_out",
            TEST_COOKIE: "_vis_opt_test_cookie",
            COOKIE_JAR: "_vwo",
            SAME_SITE: "_vwo_ssm",
            UUID: "uuid",
            UUID_V2: "uuid_v2",
            DEFAULT_EXPIRY: 100,
            UUID_COOKIE_EXPIRY: 3650,
          };
          var cookieExpiryMapping =
            ((_a = {}),
            (_a[cookiePrefix1 + "test_cookie"] = 0),
            (_a[cookiePrefix2 + "ds"] = globalCookieExpiry),
            (_a[cookiePrefix2 + "sn"] = sessionCookieExpiry),
            (_a[cookiePrefix2 + "referrer"] = 0.00018),
            (_a[cookiePrefix2 + "uuid"] = 3650),
            (_a[cookiePrefix2 + "uuid_v2"] = 366),
            (_a[CookieEnum.SAME_SITE] = 3650),
            _a);

          window.___vwo = 1;
          if (!VWO._.track.loaded) {
            var utils = VWO._.utils,
              CampaignEnum = VWO._.CampaignEnum,
              GoalsEnum = VWO._.GoalsEnum,
              libUtils = VWO._.libUtils,
              cookies = VWO._.cookies,
              EventsEnum = VWO._.EventsEnum,
              triggerEvent = VWO._.triggerEvent,
              commonUtil$1 = VWO._.commonUtil,
              coreLib = VWO._.coreLib,
              vwoLib = VWO._.vwoLib,
              campaign = VWO._.campaign,
              listener = VWO._.listener,
              sessionInfoService = VWO._.sessionInfoService,
              tags = VWO._.tags,
              localStorageService = VWO._.localStorageService;
            var accountId = window._vwo_acc_id,
              vwoExp = window._vwo_exp,
              vwoExpIds = window._vwo_exp_ids;
            constants.FUNNEL_EXPIRY = VWO.FUNNEL_EXPIRY_CUSTOM || 100;
            var track = {
              setUp: function () {
                track.preProcessData();
              },
              init: function () {
                if (!track.initiated) {
                  if (!libUtils.doesUuidCookiesExist()) {
                    cookies.erase(constants.TRACK_SESSION_COOKIE_NAME);
                    cookies.erase(constants.TRACK_GLOBAL_COOKIE_NAME);
                  }
                }
                track.expireGlobalCookie();
                track.expireGoals();
                if (!track.createGlobalCookieReturnEligibility()) {
                  triggerEvent(
                    EventsEnum.RECORDING_NOT_ELIGIBLE,
                    "URL_NOT_MATCHING"
                  );
                  return false;
                }
                if (track.isUserBucketed()) {
                  track.startSession();
                } else {
                  triggerEvent(
                    EventsEnum.RECORDING_NOT_ELIGIBLE,
                    "USER_NOT_BUCKETED"
                  );
                }
                track.expireFunnels(commonUtil$1.getServerStartTimestamp(true));
                cookieHandler.init();
                track.initiated = true;
                track.visitorRetracked = false;
                return true;
              },
              preProcessData: function () {
                VWO.data.url = VWO.data.url || {};
                VWO.data.url.i = VWO.data.url.i || ".*";
              },
              isUserEligible: function () {
                var isEligibleObj = coreLib.compareUrlWithIncludeExcludeRegex(
                  coreLib.getCurrentUrl(),
                  VWO.data.url.i,
                  VWO.data.url.e
                );
                return isEligibleObj.didMatch;
              },
              expireGlobalCookie: function () {
                if (track.shouldExpireGlobalCookie()) {
                  cookies.erase(constants.TRACK_GLOBAL_COOKIE_NAME);
                  cookies.erase(constants.TRACK_SESSION_COOKIE_NAME);
                }
              },
              getLatestSamplingVersion: function () {
                return window.VWO.data.pvn || constants.INITIAL_PRICING_VERSION;
              },
              getCpt: function () {
                return window.VWO.data.cpt || 0;
              },
              updateTrackPageId: function () {
                var newTrackPageId = track.getTrackPageId() + 1;
                track.markTrackPageId(newTrackPageId);
                return newTrackPageId;
              },
              getTrackPageId: function () {
                var value = sessionInfoService.getSNCookieValueByIndex(
                  constants.TRACK_PAGE_ID_INFORMATION_INDEX
                );
                if (value) {
                  return parseInt(value, 10);
                }
                return 0;
              },
              markTrackPageId: function (pageId) {
                sessionInfoService.setSNCookieValueByIndex(
                  constants.TRACK_PAGE_ID_INFORMATION_INDEX,
                  pageId
                );
              },
              getCroStartTimestamp: function () {
                return cookieHandler.getDataInfoByIndex(
                  constants.CRO_START_TIMESTAMP_INDEX
                );
              },
              setCroStartTimestamp: function () {
                var croStartTimestamp =
                  commonUtil$1.getCurrentTimestamp(true) -
                  sessionInfoService.getFirstSessionId();
                cookieHandler.setDataInfoByIndex(
                  constants.CRO_START_TIMESTAMP_INDEX,
                  croStartTimestamp
                );
              },
              shouldExpireGlobalCookie: function () {
                var cookieValue = cookieHandler.getDataStore(),
                  firstSessionIdTimestamp,
                  cookieExpiry,
                  cookieExpiryState = cookieHandler.getMetaInfoByIndex(
                    constants.TRACK_GLOBAL_COOKIE_EXPIRY_STATE_INDEX
                  );
                if (cookieValue) {
                  var currentTS = commonUtil$1.getServerStartTimestamp(true);
                  firstSessionIdTimestamp =
                    sessionInfoService.getFirstSessionId();
                  var croStartTimestamp = track.getCroStartTimestamp();
                  cookieExpiry =
                    constants.TRACK_GLOBAL_COOKIE_EXPIRY * 24 * 60 * 60 +
                    croStartTimestamp +
                    firstSessionIdTimestamp;
                  if (cookieExpiry < currentTS) {
                    if (sessionInfoService.getSessionStore()) {
                      if (!cookieExpiryState) {
                        cookieHandler.setMetaInfoByIndex(
                          constants.TRACK_GLOBAL_COOKIE_EXPIRY_STATE_INDEX,
                          1
                        );
                      }
                      return false;
                    }
                    return true;
                  }
                  var croPlanEnabledTimestamp = track.getCpt();
                  if (croPlanEnabledTimestamp > firstSessionIdTimestamp) {
                    return true;
                  }
                  var latestSamplingVersion = track.getLatestSamplingVersion(),
                    currentSamplingVersion =
                      cookieHandler.getMetaInfoByIndex(
                        constants.SAMPLING_VERSION_INDEX
                      ) || constants.INITIAL_PRICING_VERSION;
                  if (currentSamplingVersion < latestSamplingVersion);
                  else if (
                    Math.abs(currentSamplingVersion) <
                    Math.abs(latestSamplingVersion)
                  ) {
                    if (track.isUserBucketed()) {
                      return true;
                    }
                  }
                }
                return false;
              },
              _markFunnelValue: function (funnelId, goalId, isBucketed) {
                this._markFeatureValue(
                  constants.FUNNEL_INFORMATION_INDEX,
                  funnelId,
                  [
                    goalId,
                    isBucketed,
                    sessionInfoService.getRelativeSessionId(),
                    vwoExp[funnelId].v,
                  ]
                );
              },
              _isFunnelValue: function (funnelId, goalId, isBucketed) {
                return this._isFeatureValue(
                  constants.FUNNEL_INFORMATION_INDEX,
                  funnelId,
                  [goalId, isBucketed]
                );
              },
              expireFunnels: function (currentTS) {
                var cookieValue = cookieHandler.getDataStore(),
                  firstSessionId = sessionInfoService.getFirstSessionId(),
                  funnels,
                  funnelLength,
                  funnelValues,
                  fId,
                  funnelExpiry,
                  funnelVersion;
                if (cookieValue) {
                  cookieValue = cookieValue.split(":");
                  funnels =
                    cookieValue[constants.FUNNEL_INFORMATION_INDEX].split(",");
                  funnelLength = funnels.length;
                  while (funnelLength--) {
                    funnelValues = funnels[funnelLength].split("_");
                    fId = funnelValues[0];
                    funnelExpiry =
                      +funnelValues[3] +
                      constants.FUNNEL_EXPIRY * 24 * 60 * 60 +
                      firstSessionId;
                    funnelVersion = +funnelValues[4];
                    if (
                      funnelExpiry < currentTS ||
                      (vwoExp[fId] && vwoExp[fId].v > funnelVersion)
                    ) {
                      funnels.splice(funnelLength, 1);
                    }
                  }
                  cookieValue[constants.FUNNEL_INFORMATION_INDEX] =
                    funnels.join(",");
                  cookieValue = cookieValue.join(":");
                  cookieHandler.setDataStore(cookieValue);
                }
              },
              expireGoals: function () {
                var sessionCookie = sessionInfoService.getSessionStore();
                if (
                  !sessionCookie ||
                  !track.getTrackPageId() ||
                  track.visitorRetracked
                ) {
                  cookieHandler.deleteDataStoreInfoByIndex(
                    constants.GOAL_INFORMATION_INDEX
                  );
                }
              },
              getSessionIdOfFunnel: function (funnelId) {
                var cookieValue = cookieHandler.getDataStore(),
                  match = cookieValue.match(
                    new RegExp("[:,]" + funnelId + "_[^_]*_._([^_]*)_[^,:]*")
                  );
                if (match && match[1]) {
                  return +match[1] + sessionInfoService.getFirstSessionId();
                }
                return 0;
              },
              _markFeatureValue: function (
                featureIndex,
                id,
                featureValues,
                isMetaInfo
              ) {
                var cookieValue = isMetaInfo
                    ? cookieHandler.getMetaStore()
                    : cookieHandler.getDataStore(),
                  featuresDataList = cookieValue.split(":"),
                  valueToBeMarked = id,
                  featureInfo = featuresDataList[featureIndex],
                  counter = featuresDataList.length;
                if (!featureInfo) {
                  while (counter <= featureIndex) {
                    featuresDataList[counter] = "";
                    counter++;
                  }
                }
                featureInfo = featuresDataList[featureIndex];
                var match = featureInfo.match(
                  new RegExp("(?:^|,)(" + id + "_[^,]+)")
                );
                if (typeof featureValues === "undefined") {
                  featureValues = [];
                }
                if (!(featureValues instanceof Array)) {
                  featureValues = [featureValues];
                }
                for (var i = 0; i < featureValues.length; i++) {
                  valueToBeMarked += "_" + featureValues[i];
                }
                if (match) {
                  featuresDataList[featureIndex] = featuresDataList[
                    featureIndex
                  ].replace(
                    new RegExp("(^|,)(" + id + "_[^,]+)"),
                    "$1" + valueToBeMarked
                  );
                } else {
                  featuresDataList[featureIndex] =
                    featuresDataList[featureIndex] +
                    (featuresDataList[featureIndex].length === 0 ? "" : ",") +
                    valueToBeMarked;
                }
                cookieValue = featuresDataList.join(":");
                if (isMetaInfo) {
                  cookieHandler.setMetaStore(cookieValue);
                } else {
                  cookieHandler.setDataStore(cookieValue);
                }
              },
              _isFeatureValue: function (
                featureIndex,
                id,
                featureValues,
                isMetaInfo
              ) {
                var cookieValue = isMetaInfo
                    ? cookieHandler.getMetaStore()
                    : cookieHandler.getDataStore(),
                  featuresDataList = cookieValue.split(":"),
                  featureInfo = featuresDataList[featureIndex],
                  isBucketed,
                  regExp;
                if (typeof featureValues === "undefined") {
                  featureValues = [];
                }
                if (!(featureValues instanceof Array)) {
                  featureValues = [featureValues];
                }
                if (featureIndex === constants.FUNNEL_INFORMATION_INDEX) {
                  isBucketed = featureValues[1];
                  var goalId = featureValues[0];
                  goalId = goalId || "[^_]*";
                  isBucketed =
                    typeof isBucketed === "undefined" || isBucketed === null
                      ? "."
                      : isBucketed;
                  regExp = new RegExp(
                    "(,|^)" + id + "_" + goalId + "_" + isBucketed
                  );
                } else {
                  isBucketed = featureValues[0];
                  isBucketed =
                    typeof isBucketed === "undefined" || isBucketed === null
                      ? "."
                      : isBucketed;
                  regExp = new RegExp("(,|^)" + id + "_" + isBucketed);
                }
                return regExp.test(featureInfo) ? "1" : false;
              },
              _markGoalValue: function (id, isBucketed) {
                this._markFeatureValue(
                  constants.GOAL_INFORMATION_INDEX,
                  id,
                  isBucketed
                );
              },
              _isGoalValue: function (id, isBucketed) {
                return this._isFeatureValue(
                  constants.GOAL_INFORMATION_INDEX,
                  id,
                  isBucketed
                );
              },
              isCroEnabled: function () {
                var globalCookie = cookies.get(
                  constants.TRACK_GLOBAL_COOKIE_NAME
                );
                if (!globalCookie) {
                  return false;
                }
                var cookieValue = cookieHandler.getMetaStore().split(":") || [];
                if (
                  cookieValue[constants.FEATURE_BUCKET_INDEX] ||
                  cookieValue[constants.SAMPLING_VERSION_INDEX]
                ) {
                  return true;
                }
              },
              createGlobalCookieReturnEligibility: function () {
                if (!track.isCroEnabled()) {
                  if (!track.isUserEligible()) {
                    return false;
                  }
                  if (!cookies.get(constants.TRACK_GLOBAL_COOKIE_NAME)) {
                    libUtils.createUUIDCookie();
                    sessionInfoService.createGlobalCookie();
                  }
                  track.setCroStartTimestamp();
                }
                track.markFeatureLevelBucketing();
                track.setSamplingVersion();
                return true;
              },
              markFeatureLevelBucketing: function () {
                var sampleVisitorData = window.VWO.data.pc.sampleData;
                var highestPriorityData =
                  sampleVisitorData && sampleVisitorData[0];
                if (sampleVisitorData) {
                  for (var i = 1; i < sampleVisitorData.length; i++) {
                    if (
                      sampleVisitorData[i].priority <
                      highestPriorityData.priority
                    ) {
                      highestPriorityData = sampleVisitorData[i];
                    }
                  }
                }
                delete VWO.data.pc.sampleData;
                var pcTraffic = sessionInfoService.getPcTraffic(),
                  vwoPc = window._vwo_pc_custom || window.VWO.data.pc,
                  features = commonUtil$1.getKeys(vwoPc),
                  featureLength = features.length;
                var isTriggerEnabled = false;
                window.VWO.data.isUsingSamplingRules = false;
                if (
                  !window._vwo_pc_custom &&
                  window.VWO.data.pc.a !== -1 &&
                  highestPriorityData
                ) {
                  if (highestPriorityData.samplingRate !== -2) {
                    vwoPc["a"] = highestPriorityData.samplingRate;
                    vwoPc["t"] = highestPriorityData.samplingRate;
                    window.VWO.data.isUsingSamplingRules = true;
                  }
                  isTriggerEnabled =
                    !track.isUserBucketed() && sampleVisitorData.length > 0;
                }
                while (featureLength--) {
                  if (
                    !track._isFeatureValue(
                      constants.FEATURE_BUCKET_INDEX,
                      features[featureLength],
                      null,
                      1
                    ) ||
                    VWO.data.eFSFI ||
                    isTriggerEnabled
                  ) {
                    track._markFeatureValue(
                      constants.FEATURE_BUCKET_INDEX,
                      features[featureLength],
                      +(pcTraffic < vwoPc[features[featureLength]]),
                      true
                    );
                  }
                }
              },
              setSamplingVersion: function () {
                cookieHandler.setMetaInfoByIndex(
                  constants.SAMPLING_VERSION_INDEX,
                  track.getLatestSamplingVersion()
                );
              },
              isUserBucketed: function () {
                var vwoPc = window.VWO.data.pc,
                  features = commonUtil$1.getKeys(vwoPc),
                  featureLength = features.length;
                while (featureLength--) {
                  if (track.isFeatureBucketed(features[featureLength])) {
                    return true;
                  }
                }
              },
              isFeatureBucketed: function (featureKey) {
                if (!featureKey) {
                  return true;
                }
                return track._isFeatureValue(
                  constants.FEATURE_BUCKET_INDEX,
                  featureKey,
                  1,
                  true
                );
              },
              excludeFunnel: function (id) {
                track._markFunnelValue(id, 0, 0);
              },
              includeFunnel: function (id) {
                track._markFunnelValue(id, 0, 1);
              },
              includeAnalyzeCampaign: function (id) {
                cookieHandler.includeAnalyzeCampaign(id);
              },
              excludeAnalyzeCampaign: function (id) {
                cookieHandler.excludeAnalyzeCampaign(id);
              },
              excludeGoal: function (id) {
                track._markGoalValue(id, 0);
              },
              includeGoal: function (id) {
                track._markGoalValue(id, 1);
              },
              shouldAddGoalInFunnel: function (funnelId, goalId) {
                goalId = parseInt(goalId, 10);
                var goalIndex = track.getGoalIndexInFunnel(funnelId, goalId),
                  match;
                if (goalIndex < 0) {
                  return false;
                }
                var isFirstGoal = vwoExp[funnelId].g[0].id === goalId,
                  funnels = cookieHandler
                    .getDataStore()
                    .split(":")
                    [constants.FUNNEL_INFORMATION_INDEX].split(","),
                  funnelLength,
                  funnelValues,
                  fId,
                  currentlyTriggeredGoalId,
                  isBucketed,
                  funnelProcessed;
                funnelLength = funnels.length;
                while (funnelLength--) {
                  funnelValues = funnels[funnelLength].split("_");
                  fId = funnelValues[0];
                  if (fId === funnelId) {
                    funnelProcessed = true;
                    currentlyTriggeredGoalId = +funnelValues[1];
                    isBucketed = +funnelValues[2];
                    if (isBucketed) {
                      match =
                        track.getGoalIndexInFunnel(
                          funnelId,
                          currentlyTriggeredGoalId
                        ) +
                          1 ===
                        goalIndex;
                    } else {
                      return false;
                    }
                  }
                }
                if (isFirstGoal && !funnelProcessed) {
                  coreLib.runCampaigns(
                    {
                      keepElementLoadedRunning: false,
                      expIds: [funnelId],
                      isManual: true,
                    },
                    null,
                    null,
                    true
                  );
                  if (track.isFunnelIncluded(funnelId)) {
                    match = true;
                  }
                }
                return match;
              },
              getGoalIndexInFunnel: function (funnelId, goalId) {
                var i;
                for (i = 0; i < vwoExp[funnelId].g.length; i++) {
                  if (vwoExp[funnelId].g[i].id === goalId) {
                    return i;
                  }
                }
                return -1;
              },
              getGoalsString: function (goals) {
                var i,
                  str = "";
                for (i = 0; i < goals.length; i++) {
                  str =
                    str +
                    goals[i].id +
                    (goals[i].type === "REVENUE_TRACKING" ? "_1" : "") +
                    (i === goals.length - 1 ? "" : ",");
                }
                return str;
              },
              getGtAndF: function (goalId) {
                var expLength = vwoExpIds.length,
                  expId,
                  funnels = {},
                  funnelIds;
                while (expLength--) {
                  expId = vwoExpIds[expLength];
                  if (vwoExp[expId].type === CampaignEnum.FUNNEL_CAMPAIGN) {
                    if (this.shouldAddGoalInFunnel(expId, goalId)) {
                      track._markFunnelValue(expId, goalId, 1);
                      funnels[expId] =
                        this.getGoalsString(vwoExp[expId].g) +
                        ":" +
                        track.getSessionIdOfFunnel(expId);
                    }
                  }
                }
                funnelIds = commonUtil$1.getKeys(funnels);
                return (
                  "&gt=" +
                  +!track.isGoalTriggered(goalId) +
                  "_" +
                  funnelIds.join(",") +
                  "&f=" +
                  utils.jsonStringify(funnels)
                );
              },
              startSession: function () {
                var url = document.URL,
                  sessionUrl =
                    "s.gif?" +
                    "account_id=" +
                    accountId +
                    libUtils.getUUIDString(libUtils.createUUIDCookie()),
                  pageId = 1,
                  tagValue,
                  egTagValue,
                  relativeSessionId,
                  returningVisitor,
                  sessionId,
                  trackPageId,
                  tagsLength,
                  tagValue2,
                  tagsLength2;
                if (!sessionInfoService.isSessionInfoSynced()) {
                  pageId = 1;
                  tags.refresh();
                  tagValue = tags.getTags();
                  egTagValue = tags.getEgTags();
                  try {
                    tagsLength =
                      window._vwo_acc_id == 6 && tagValue
                        ? JSON.parse(tagValue).si &&
                          Object.keys(JSON.parse(tagValue).si).length
                        : undefined;
                  } catch (e) {
                    window.VWO._.customError &&
                      window.VWO._.customError({
                        msg: "Issue with tagValue",
                        url: "track-lib.ts",
                        lineno: 667,
                        colno: 5,
                        source: JSON.stringify({
                          tagValue: tagValue,
                          lt: new Date().getTime(),
                          referrer: document.referrer,
                        }),
                      });
                  }
                  if (!sessionInfoService.getSessionStore()) {
                    relativeSessionId =
                      sessionInfoService.getRelativeSessionTimestamp(this);
                    sessionInfoService.initializeSession(
                      relativeSessionId + ":" + pageId + ":::" + 1
                    );
                    VWO._.pageId = pageId;
                  } else {
                    sessionInfoService.updateAndSyncPageId();
                    pageId = VWO._.pageId;
                    sessionInfoService.setSNCookieValueByIndex(
                      constants.SESSION_SYNCED_STATE_INDEX,
                      1
                    );
                  }
                  trackPageId = track.updateTrackPageId();
                  sessionId = sessionInfoService.getSessionId();
                  sessionUrl = sessionUrl + "&s=" + sessionId + "&p=" + pageId;
                  returningVisitor =
                    sessionId > sessionInfoService.getFirstSessionId();
                  if (!window._vis_debug) {
                    var extraData = libUtils.extraData(true);
                    var encodedExtraData = encodeURIComponent(extraData);
                    var requestURL =
                      sessionUrl +
                      "&ed=" +
                      encodedExtraData +
                      "&cu=" +
                      encodeURIComponent(
                        sessionInfoService.getInfo().cu || url
                      ) +
                      (tagValue ? "&tags=" + tagValue : "") +
                      (egTagValue ? "&eg=" + egTagValue : "") +
                      (tagsLength ? "&tagsLength=" + tagsLength : "") +
                      "&r=" +
                      +returningVisitor +
                      (window._vwo_acc_id == 6 && window.VWO.isSafari
                        ? "&isSafari=" + window.VWO.isSafari
                        : "") +
                      "&cq=1";
                    libUtils.sendCall(requestURL);
                    if (window._vwo_acc_id == 6) {
                      tagValue2 = tags.getTags(true);
                      try {
                        tagsLength2 =
                          window._vwo_acc_id == 6 && tagValue2
                            ? JSON.parse(tagValue2).si &&
                              Object.keys(JSON.parse(tagValue2).si).length
                            : undefined;
                      } catch (e) {
                        window.VWO._.customError &&
                          window.VWO._.customError({
                            msg: "Issue with tagValue",
                            url: "track-lib.ts",
                            lineno: 667,
                            colno: 5,
                            source: JSON.stringify({
                              tagValue: tagValue,
                              lt: new Date().getTime(),
                              referrer: document.referrer,
                            }),
                          });
                      }
                      if (tagValue2) {
                        var requestURL_1 =
                          sessionUrl +
                          "&ed=" +
                          encodedExtraData +
                          "&cu=" +
                          encodeURIComponent(
                            sessionInfoService.getInfo().cu || url
                          ) +
                          (tagValue ? "&tags=" + tagValue2 : "") +
                          (tagsLength ? "&tagsLength=" + tagsLength2 : "") +
                          "&r=" +
                          +returningVisitor +
                          (window._vwo_acc_id == 6 && window.VWO.isSafari
                            ? "&isSafari=" + window.VWO.isSafari
                            : "") +
                          "&pageExitListener=" +
                          (window.VWO && window.VWO.pageExitListener) +
                          "&batch=true" +
                          "&fromTrack=true" +
                          "&cq=1";
                        libUtils.sendCall(requestURL_1);
                      }
                    }
                    try {
                      JSON.parse(decodeURIComponent(encodedExtraData)).lt;
                    } catch (e) {
                      window.VWO._.customError &&
                        window.VWO._.customError({
                          msg: "extraData(ed) is not a JSON string [while sending call for 's.gif']",
                          url: "track-lib.ts",
                          lineno: 688,
                          colno: 5,
                          source: JSON.stringify({
                            extraData: extraData,
                            lt: new Date().getTime(),
                            referrer: document.referrer,
                            requestURL: requestURL,
                          }),
                        });
                    }
                  }
                } else {
                  sessionInfoService.updateAndSyncPageId();
                  trackPageId = track.updateTrackPageId();
                  tagValue = tags.getTags();
                  egTagValue = tags.getEgTags();
                  try {
                    tagsLength =
                      window._vwo_acc_id == 6 && tagValue
                        ? JSON.parse(tagValue).si &&
                          Object.keys(JSON.parse(tagValue).si).length
                        : undefined;
                  } catch (e) {
                    window.VWO._.customError &&
                      window.VWO._.customError({
                        msg: "Issue with tagValue",
                        url: "track-lib.ts",
                        lineno: 667,
                        colno: 5,
                        source: JSON.stringify({
                          tagValue: tagValue,
                          lt: new Date().getTime(),
                          referrer: document.referrer,
                        }),
                      });
                  }
                  sessionId = sessionInfoService.getSessionId();
                  pageId = VWO._.pageId;
                  returningVisitor =
                    sessionId > sessionInfoService.getFirstSessionId();
                  sessionUrl = sessionUrl + "&s=" + sessionId + "&p=" + pageId;
                  if (!window._vis_debug) {
                    libUtils.sendCall(
                      sessionUrl +
                        (tagValue ? "&tags=" + tagValue : "") +
                        (egTagValue ? "&eg=" + egTagValue : "") +
                        (tagsLength ? "&tagsLength=" + tagsLength : "") +
                        (window._vwo_acc_id == 6 && window.VWO.isSafari
                          ? "&isSafari=" + window.VWO.isSafari
                          : "") +
                        "&update=1&cq=1"
                    );
                    if (window._vwo_acc_id == 6) {
                      tagValue2 = tags.getTags(true);
                      try {
                        tagsLength2 =
                          window._vwo_acc_id == 6 && tagValue2
                            ? JSON.parse(tagValue2).si &&
                              Object.keys(JSON.parse(tagValue2).si).length
                            : undefined;
                      } catch (e) {
                        window.VWO._.customError &&
                          window.VWO._.customError({
                            msg: "Issue with tagValue",
                            url: "track-lib.ts",
                            lineno: 667,
                            colno: 5,
                            source: JSON.stringify({
                              tagValue: tagValue,
                              lt: new Date().getTime(),
                              referrer: document.referrer,
                            }),
                          });
                      }
                      if (tagValue2) {
                        libUtils.sendCall(
                          sessionUrl +
                            (tagValue ? "&tags=" + tagValue2 : "") +
                            (tagsLength ? "&tagsLength=" + tagsLength2 : "") +
                            (window._vwo_acc_id == 6 && window.VWO.isSafari
                              ? "&isSafari=" + window.VWO.isSafari
                              : "") +
                            "&pageExitListener=" +
                            (window.VWO && window.VWO.pageExitListener) +
                            "&batch=true" +
                            "&fromTrack=true" +
                            "&update=1&cq=1"
                        );
                      }
                    }
                  }
                }
                if (
                  (isNaN(sessionId) || isNaN(pageId)) &&
                  window.VWO._.customError
                ) {
                  var debugObject = {
                    _vwo_sn: cookies.get(CookieEnum.TRACK_SESSION_COOKIE_NAME),
                    _vwo_ds: cookies.get(CookieEnum.TRACK_GLOBAL_COOKIE_NAME),
                  };
                  var message = "Error while sending s.gif: ";
                  if (isNaN(sessionId)) {
                    message += "Session Id is NaN";
                  }
                  if (isNaN(pageId)) {
                    message = message ? message + ", " : message;
                    message += "Page Id is NaN";
                    debugObject.pageId = pageId;
                  }
                  window.VWO._.customError({
                    msg: message,
                    url: "track-lib.ts",
                    source: JSON.stringify(debugObject),
                    lineno: 640,
                    colno: 641,
                  });
                }
                sessionInfoService.setVisitorInformation();
                track.setAnalyzeServerName();
                triggerEvent(
                  EventsEnum.TRACK_SESSION_CREATED,
                  sessionId,
                  pageId,
                  returningVisitor,
                  trackPageId === 1,
                  trackPageId
                );
                sessionInfoService.updateSession();
              },
              setAnalyzeServerName: function () {
                var analyzeServerName =
                  sessionInfoService.getSNCookieValueByIndex(
                    constants.ANALYSE_SERVER_NAME_INDEX
                  );
                if (analyzeServerName) {
                  window.VWO.data.asn = analyzeServerName;
                } else {
                  if (window.VWO.data.as) {
                    sessionInfoService.setSNCookieValueByIndex(
                      constants.ANALYSE_SERVER_NAME_INDEX,
                      window.VWO.data.as
                    );
                  }
                  window.VWO.data.asn =
                    window.VWO.data.as || "dev.visualwebsiteoptimizer.com";
                }
              },
              isGoalIncluded: function (id) {
                return this._isGoalValue(id, 1) || this._isGoalValue(id, 2);
              },
              isGoalExcluded: function (id) {
                return this._isGoalValue(id, 0);
              },
              isAnalyzeCampaignExcluded: function (id) {
                return cookieHandler.isAnalyzeCampaignExcluded(id);
              },
              isAnalyzeCampaignIncluded: function (id) {
                return cookieHandler.isAnalyzeCampaignIncluded(id);
              },
              isFunnelIncluded: function (id) {
                return track._isFunnelValue(id, undefined, 1);
              },
              isFunnelExcluded: function (id) {
                return track._isFunnelValue(id, undefined, 0);
              },
              markGoalTriggered: function (expId, goalId) {
                var goal = vwoExp[expId].goals[goalId];
                track._markGoalValue(goalId, 2);
                if (goal.type === GoalsEnum.SEPARATE_PAGE) {
                  goal.pageVisited = 1;
                }
              },
              isGoalTriggered: function (id) {
                return track._isGoalValue(id, 2);
              },
              shouldTriggerGoal: function (expId, goalId) {
                var goal = vwoExp[expId].goals[goalId],
                  retVal = false;
                if (track._isGoalValue(goalId, 0)) {
                  return false;
                }
                if (track._isGoalValue(goalId, 1)) {
                  retVal = !goal.pageVisited;
                }
                if (track._isGoalValue(goalId, 2)) {
                  retVal = false;
                }
                if (!goal.pageVisited && !retVal) {
                  var expLength = vwoExpIds.length,
                    experimentId;
                  while (expLength--) {
                    experimentId = vwoExpIds[expLength];
                    if (
                      vwoExp[experimentId].type ===
                        CampaignEnum.FUNNEL_CAMPAIGN &&
                      this.shouldAddGoalInFunnel(experimentId, goalId)
                    ) {
                      retVal = true;
                    }
                  }
                }
                if (goal.type === GoalsEnum.SEPARATE_PAGE) {
                  goal.pageVisited = true;
                }
                return retVal;
              },
              loaded: true,
              initiated: false,
            };
            commonUtil$1.extend(VWO._.track, track);
            track = VWO._.track;
            var processCampaignsWrapper = function () {
              if (VWO.data.tcVersion === 3 && !dynamicInfoFetched) {
                return;
              }
              track.setUp();
              if (!track.init()) {
                return;
              }
              coreLib.runCampaigns(
                {
                  keepElementLoadedRunning: false,
                  expIds: commonUtil$1.filter(vwoExpIds, function (id) {
                    return libUtils.isSessionBasedCampaign(id);
                  }),
                  isManual: false,
                },
                null,
                null,
                true
              );
            };
            var processCampaigns = function () {
              if (VWO._.ac && VWO._.ac.cInstJS) {
                VWO._.addConsentTrigger(processCampaignsWrapper);
              } else {
                processCampaignsWrapper();
              }
            };
            var checkForPersisitedTrackData = function () {
              try {
                var lsKeyName = "_vwo_track_data_" + window._vwo_acc_id;
                var persistedTrackData = localStorageService.get(lsKeyName);
                if (persistedTrackData) {
                  var parsedPersistedTrackData =
                    utils.jsonParse(persistedTrackData);
                  var keys = Object.keys(parsedPersistedTrackData);
                  for (var i = keys.length; i--; ) {
                    window.VWO.push([
                      parsedPersistedTrackData[keys[i]][0],
                      parsedPersistedTrackData[keys[i]][1],
                    ]);
                  }
                }
                localStorageService.remove(lsKeyName);
              } catch (e) {
                var errorMessage =
                  "[JSLIB_TRACK] Error - Check for persisited track data.";
                window.VWO._.customError &&
                  window.VWO._.customError({
                    msg: errorMessage,
                    url: "track-lib.ts",
                    source: encodeURIComponent(errorMessage),
                  });
              }
            };
            var initializeLib = function () {
                if (VWO.data.tcVersion === 3 && !dynamicInfoFetched) {
                  return;
                }
                if (!notRedirectingEventTriggered) {
                  return;
                }
                if (!ENABLE_TESTING && !track.initiated) {
                  checkForPersisitedTrackData();
                  processCampaigns();
                  vwoLib.init("track") && (track.vwoLibInitiated = true);
                }
              },
              dynamicInfoFetched,
              notRedirectingEventTriggered;
            var retrackVisitorWrapper_1 = function () {
              track.visitorRetracked = true;
              track.init();
              coreLib.runCampaigns(
                false,
                commonUtil$1.filter(vwoExpIds, function (id) {
                  try {
                    var combinationChosen =
                      window._vwo_exp[id].combination_chosen;
                  } catch (error) {
                    if (window.VWO._.customError) {
                      window.VWO._.customError({
                        msg:
                          "LOGGING: experiment id " +
                          id +
                          "not found in " +
                          window._vwo_exp_ids,
                        url: "track-lib.ts",
                        lineno: 879,
                        colno: 9,
                      });
                    }
                  }
                  if (window._vwo_exp && window._vwo_exp[id])
                    return (
                      libUtils.isSessionBasedCampaign(id) &&
                      ((window._vwo_exp[id].combination_chosen = undefined) ||
                        1)
                    );
                  else return libUtils.isSessionBasedCampaign(id);
                }),
                null,
                true
              );
              track.visitorRetracked = false;
            };
            listener.onEventReceive(EventsEnum.RETRACK_VISITOR, function () {
              if (VWO._.ac && VWO._.ac.cInstJS) {
                VWO._.addConsentTrigger(retrackVisitorWrapper_1);
              } else {
                retrackVisitorWrapper_1();
              }
            });
            listener.onEventReceive(
              EventsEnum.NEW_SESSION_CREATED,
              function () {
                track.visitorRetracked = true;
              }
            );
            listener.onEventReceive(EventsEnum.POST_URL_CHANGE, function () {
              processCampaigns();
              if (!track.vwoLibInitiated) {
                checkForPersisitedTrackData();
                vwoLib.init("track");
              }
            });
            listener.onEventReceive(EventsEnum.NOT_REDIRECTING, function () {
              if (notRedirectingEventTriggered) {
                return;
              }
              notRedirectingEventTriggered = true;
              initializeLib();
            });
            listener.onEventReceive(
              EventsEnum.UPDATE_SETTINGS_CALL,
              function () {
                if (dynamicInfoFetched) {
                  return;
                }
                dynamicInfoFetched = true;
                initializeLib();
              }
            );
            if (ENABLE_TESTING) {
              track.setTrackInitialized = function (value) {
                track.initiated = value;
              };
              track.getTrackInitialized = function () {
                return track.initiated;
              };
            }
          }
          var track$1 = track;

          return track$1;
        })();
      }
    );
  })();
})();
