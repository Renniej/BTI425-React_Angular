import { definition } from './definition';




export interface term{

    wordExpanded: string,
    wordNonEnglish : string,
    image: string,
    imageType: string,
    audio: string,
    linkAuthoritative: string,
    linkWikipedia: string,
    linkYoutube: string,
    fieldOfStudy: string,
    helpYes: number,
    helpNo: number,
    definitions: definition[],

    _id: string,
    wordEnglish: string,
    languageCode: string,
    authorName: string,
    dateCreated: string,
    dateRevised: string,
    termEnglish : string
}