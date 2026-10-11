function entityLinkerAgent(input = {}) {
  const transactions = Array.isArray(input.transactions)
    ? input.transactions
    : [];

  const entities = new Map();

  function addEntity(type, value, transactionId) {
    if (value === undefined || value === null || value === "") {
      return;
    }

    const key = `${type}:${value}`;

    if (!entities.has(key)) {
      entities.set(key, {
        id: key,
        type,
        value: String(value),
        transactionIds: [],
      });
    }

    const entity = entities.get(key);

    if (
      transactionId &&
      !entity.transactionIds.includes(String(transactionId))
    ) {
      entity.transactionIds.push(String(transactionId));
    }
  }

  for (const tx of transactions) {
    if (!tx || typeof tx !== "object") continue;

    addEntity("account", tx.accountId, tx.transactionId);
    addEntity("counterparty", tx.counterpartyId, tx.transactionId);
    addEntity("device", tx.deviceId, tx.transactionId);
  }

  const linkedEntities = Array.from(entities.values());

  return {
    linkedEntities,
    sharedEntities: linkedEntities.filter(
      (entity) => entity.transactionIds.length > 1
    ),
    demoMode: true,
  };
}

module.exports = { entityLinkerAgent };
