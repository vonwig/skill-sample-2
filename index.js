const api = require("@atomist/skill-entry-point")
const {v4 : uuidv4} = require("uuid")

api.start(async payload => {
  const tx = obj => {
    return api.entitiesPayload(payload.correlation_id,api.prStr(obj))
  }
  payload.logger.info(`correlation id: ${payload.correlation_id}`)
  if ("webhook_raw_payload" === payload.type) {
    payload.publish(tx(
      [{"schema/entity-type": "vonwig.testing/observation",
        "vonwig.testing.observation/id": uuidv4().toString(),
        "vonwig.testing.observation/seen-by-subscriber": false,
        "vonwig.testing.observation/webhook-value": payload.webhook.body}]))
      .then(r => {return {code: 0, reason: "created observation"}})
  } else if ("on_observation.edn" === payload.subscription.result) {
    payload.publish(tx(
      [{"schema/entity-type": "vonwig.testing/observation",
        "vonwig.testing.observation/id": payload.subscription.result[0][0].id,
        "vonwig.testing.observation/seen-by-subscriber": true}]))
      .then(r => {return {code: 0, reason: "update observation"}})
  } else {
    return {code: 1, reason: "unrecognized"}
  }
});
