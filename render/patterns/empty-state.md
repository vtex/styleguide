## Empty State

Nenhuma tela pode ficar em branco. O usuário precisa receber um feedback do que está acontecendo. Quando ele entra pela primeira vez em um sistema é comum ele não ter nenhum registro ou dado para visualizar.

A pattern de empty state precisa estar alinhada com um destes objetivos:
- Guiar o usuário para uma ação
- Informar que a informação irá aparecer exatamente naquela tela

### Empty state global

Usado para guiar o usuário a uma ação. Normalmente relacionado a configurações a ativação:

```
import Button from "/Button/index.js"
import Icon from "/Icon/index.js"
import Heading from "/Heading/index.js"

<div className="w-70 center ba b--black-20 bg-near-white pa5 tc br3">
  <Icon type="pin" size={70} color="#000" />
  <Heading size="1">Google Geolocation API</Heading>
  <p className="gray mw6 center">Para habilitar entrega por Geolocalização você precisa inserir a chave da sua Google Geolocation API.	Este recurso permite cadastrar pontos de entrega por geolocalização ao invés de código postal.</p>
  <Button>Cadastrar Chave</Button>
</div>
```
### Empty state contextual

Quando o usuário precisa esperar o dado chegar ou quando alguma query retornou vazia.

```
import Heading from "/Heading/index.js"

<div className="w-70 center ba b--black-20 bg-near-white pa3 tc br3">
  <p className="f4 gray">Você ainda não possui nenhum pedido</p>
</div>
```
