export type DrillContract = {
  answers: readonly string[];
  shortcut: string;
};

// These are operation contracts, not expected-output literals. The worker
// still evaluates every accepted expression against the immutable fixture.
// Keeping the contracts together makes catalog coverage auditable.
export const drillContracts: Record<string, DrillContract> = {
  'tensor-shapes': { answers: ['x.shape', 'x.size()', 'tuple(x.size())'], shortcut: '[8, 3]' },
  'broadcast-bias': { answers: ['x + bias'], shortcut: 'torch.tensor([[1.25, -0.5]] * 4)' },
  'seeded-shuffle': { answers: ['torch.randperm(12)', 'torch.randperm(len(rows))'], shortcut: 'rows' },
  'split-indices': { answers: ['perm[:16]'], shortcut: 'perm' },
  standardize: { answers: ['(x - x.mean()) / x.std()'], shortcut: 'x' },
  'one-hot': { answers: ['torch.nn.functional.one_hot(y, num_classes=3)', 'F.one_hot(y, num_classes=3)'], shortcut: 'y' },
  'linear-forward': { answers: ['x @ w + b'], shortcut: 'x @ w' },
  'mse-loss': { answers: ['((pred - y) ** 2).mean()'], shortcut: '0.025' },
  'gradient-step': { answers: ['w -= lr * w.grad'], shortcut: 'w -= lr * 0.6' },
  logit: { answers: ['x @ w + b'], shortcut: 'x @ w' },
  sigmoid: { answers: ['torch.sigmoid(logits)'], shortcut: 'logits' },
  threshold: { answers: ['p >= 0.5'], shortcut: 'p' },
  bce: {
    answers: [
      'torch.nn.functional.binary_cross_entropy_with_logits(logits, y)',
      'F.binary_cross_entropy_with_logits(logits, y)'
    ],
    shortcut: 'logits.mean()'
  },
  accuracy: { answers: ['(pred == y).float().mean()'], shortcut: '0.8' },
  relu: { answers: ['torch.relu(z)', 'F.relu(z)'], shortcut: 'z' },
  'two-layer': { answers: ['torch.relu(x @ w1) @ w2', 'F.relu(x @ w1) @ w2'], shortcut: '(x @ w1) @ w2' },
  'dropout-mode': { answers: ['model.eval()'], shortcut: 'model' },
  'batch-loss': { answers: ['losses.mean()'], shortcut: '0.375' },
  'zero-grad': { answers: ['optimizer.zero_grad()'], shortcut: 'optimizer' },
  'epoch-loop': { answers: ['3 * len(batches)', 'len(batches) * 3'], shortcut: '9' },
  'early-stop': { answers: ['val_loss < best'], shortcut: 'val_loss' },
  confusion: { answers: ['((pred == 1) & (y == 0)).sum()'], shortcut: '2' },
  precision: { answers: ['tp / (tp + fp)'], shortcut: '0.8' },
  recall: { answers: ['tp / (tp + fn)'], shortcut: '0.6666666667' },
  'overfit-gap': { answers: ['val_loss - train_loss'], shortcut: '0.31' },
  'knn-distance': { answers: ['((x - q) ** 2).sum(dim=1).argmin()', '((x - q) ** 2).sum(1).argmin()'], shortcut: '2' },
  'kmeans-centroid': { answers: ['points.mean(dim=0)', 'points.mean(0)'], shortcut: '[2.5, 2.5]' },
  'pca-center': { answers: ['x - x.mean(dim=0)', 'x - x.mean(0)'], shortcut: 'x - torch.tensor([3.5, 4.5])' },
  'replay-seed': { answers: ['torch.manual_seed(SEED)'], shortcut: 'torch.rand(4)' },
  'save-config': {
    answers: ['{"seed": SEED, "lr": lr, "epochs": epochs}', "{'seed': SEED, 'lr': lr, 'epochs': epochs}"],
    shortcut: '{"seed": 0, "lr": 0, "epochs": 0}'
  }
};
