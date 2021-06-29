import CollectionManager from "../../../services/firebase/collection";
import { statuses } from "../../../constants";
import { payCancellationFee } from "../../../services/firebase";

const packages = new CollectionManager("packages");

export const cancelOrder = (packageId, reason, fee) => {
  if (fee) {
    return payCancellationFee({ packageId, fee }).then(() =>
      packages.updateDoc(packageId, {
        status: statuses.cancelled,
        cancelReason: reason
      })
    );
  }
  return packages.updateDoc(packageId, {
    status: statuses.cancelled,
    cancelReason: reason
  });
};
