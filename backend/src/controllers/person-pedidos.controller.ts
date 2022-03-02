import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Person,
  Pedidos,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonPedidosController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Person has many Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedidos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedidos>,
  ): Promise<Pedidos[]> {
    return this.personRepository.pedidos(id).find(filter);
  }

  @post('/people/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedidos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {
            title: 'NewPedidosInPerson',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) pedidos: Omit<Pedidos, 'id'>,
  ): Promise<Pedidos> {
    return this.personRepository.pedidos(id).create(pedidos);
  }

  @patch('/people/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Person.Pedidos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {partial: true}),
        },
      },
    })
    pedidos: Partial<Pedidos>,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.personRepository.pedidos(id).patch(pedidos, where);
  }

  @del('/people/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Person.Pedidos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.personRepository.pedidos(id).delete(where);
  }
}
