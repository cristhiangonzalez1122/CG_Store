import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedidos,
  Person,
} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosPersonController {
  constructor(
    @repository(PedidosRepository)
    public pedidosRepository: PedidosRepository,
  ) { }

  @get('/pedidos/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Pedidos.prototype.id,
  ): Promise<Person> {
    return this.pedidosRepository.person(id);
  }
}
