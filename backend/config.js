export default {
    MONGODB_URL: process.env.MONGODB_URL || mongodb+srv://ankesh123:ankesh123@bookcluster.lqj7y.mongodb.net/wmsdb?retryWrites=true&w=majority,
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
}
