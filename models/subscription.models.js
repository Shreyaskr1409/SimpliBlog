import mongoose, {Schema} from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
    {
        blogger: {
            type: Schema.Types.ObjectId,
            ref:  "User"
        },
        subscriber: {
            type: Schema.Types.ObjectId,
            ref:  "User"
        },
    },{timestamps: true}
)

export const Subscription = mongoose.model("Subscription", subscriptionSchema);