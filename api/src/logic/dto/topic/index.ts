import { IsString, IsBoolean } from 'class-validator';

class TopicDTO {
  @IsString()
  public title: string;
  public description : string;
  public paragraph : string;
  constructor( title: string,description:string,paragraph:string ) {
    this.title = title;
    this.description = description
    this.paragraph = paragraph
    
   }
}
export default TopicDTO;
