import { injectable } from 'inversify'
import logger from '../../../web/logger'
import { validate } from 'class-validator'
import sectionDTO from 'src/logic/dto/topic'

import SectionDTO from 'src/logic/dto/section'
import { SectionRequest } from 'src/data/mongodb/section.mongo.model'
import { SectionMongoRepository } from 'src/data/mongodb/section.mongo.repository'
import { SectionPgRepository } from 'src/data/postgress/section.pg.repository'

@injectable()
export class SectionService {
  constructor(
    private readonly _sectionRepo: SectionMongoRepository,
    private readonly _sectionPgRepo: SectionPgRepository
  ) {}

  async create(section: SectionRequest) {
    try {
      const { title } = section
      const sectionDto = new SectionDTO(title)
      const errors = await validate(sectionDto)

      if (errors.length > 0) {
        console.error('Validation errors:', errors)
        return
      }
      const createdSection = await this._sectionPgRepo.create(section)
      return createdSection
    } catch (error) {
      logger.error(`message - Service create section ${error}`)
      throw error
    }
  }

  async all() {
    try {
      const sections = await this._sectionPgRepo.all()
      return sections
    } catch (error) {
      logger.error(`message - Service all section ${error}`)
      throw error
    }
  }

  async clear() {
    try {
      const clearedsections = await this._sectionPgRepo.clear()
      return clearedsections
    } catch (error) {
      logger.error(`message - Service Clear section ${error}`)
      throw error
    }
  }
}
