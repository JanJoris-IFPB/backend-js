export default interface Video {
    _id?: string,
    channelUuid: string,

    name: string,
    description: string,
    createdAt?: Date,

    views?: number,
    likes?: number,
    dislikes?: number
}