export default interface Channel {
    _id?: string,
    userUuid: string,

    name: string,
    about: string,
    createdAt?: Date,

    subscribers: number
}