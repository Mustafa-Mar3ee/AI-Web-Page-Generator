import { IsString, IsBoolean } from 'class-validator';

class SectionDTO {
  @IsString()
  public title: string;

  constructor( title: string  ) {
    this.title = title;

    
   }
}
export default SectionDTO;
