const api = require("@atomist/skill-entry-point")
const {v4 : uuidv4} = require("uuid")

api.start(async payload => {
  payload.logger.info(`execution id: ${payload["execution-id"]} with type ${payload.type}`)
  if (!! payload.context.webhook) {
    return payload.transact(
      [{"schema/entity-type": new api.Keyword("vonwig.testing/observation"),
        "vonwig.testing.observation/id": uuidv4().toString(),
        "vonwig.testing.observation/seen-by-subscriber": false,
        "vonwig.testing.observation/webhook-value": payload.context.webhook.request.body}])
      .then(_ => {return {state: "completed", reason: "created observation"}})
  } else if ("subscription" == payload.type && "on_observation" === payload.context.subscription.name) {
    return payload.transact(
      [{"schema/entity-type": new api.Keyword("vonwig.testing/observation"),
        "vonwig.testing.observation/id": payload.context.subscription.result[0][0].id,
        "vonwig.testing.observation/seen-by-subscriber": true}])
      .then(_ => {return {state: "completed", reason: "update observation"}})
  } else {
    return Promise.resolve({state: "failed", reason: "unrecognized"})
  }
});
