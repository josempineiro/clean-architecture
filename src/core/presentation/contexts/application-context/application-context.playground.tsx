import { Application, UseCase } from '@/core/domain'
import {
  Input,
  Button,
  useUseCaseQuery,
  useUseCaseMutation,
  ApplicationProvider,
  useApplication,
} from '@/core/presentation'

type Count = number

interface Counter {
  getCount(): Promise<Count>
  increase(amount: number): Promise<Count>
  decrease(amount: number): Promise<Count>
}

class MockCounter implements Counter {
  private count: number
  constructor(initialValue = 0) {
    this.count = initialValue
  }
  increase(amount = 1) {
    debugger
    this.count = this.count + amount
    return Promise.resolve(this.count)
  }
  decrease(amount = 1) {
    debugger
    this.count = this.count - amount
    return Promise.resolve(this.count)
  }
  getCount() {
    debugger
    return Promise.resolve(this.count)
  }
}

export type CounterUseCase =
  | GetCountUseCase
  | IncreaseCountUseCase
  | DecreaseCountUseCase

export type CounterUseCases = Record<string, CounterUseCase>

export interface CounterDependencies {
  counter: Counter
}

export type GetCountResult = Count

export type GetCountVariables = void

export abstract class CounterUseCasee<VariableUseCase, ResultUseCase>
  implements UseCase<VariableUseCase, ResultUseCase>
{
  public dependencies: CounterDependencies

  constructor(dependencies: CounterDependencies) {
    this.dependencies = dependencies
  }
  abstract execute(params: VariableUseCase): Promise<ResultUseCase>
}

export class GetCountUseCase extends CounterUseCasee<
  GetCountVariables,
  GetCountResult
> {
  async execute(): Promise<GetCountResult> {
    return await this.dependencies.counter.getCount()
  }
}

export type IncreaseVariables = number

export type IncreaseResult = number

export class IncreaseCountUseCase extends CounterUseCasee<
  IncreaseVariables,
  IncreaseResult
> {
  async execute(variables: IncreaseVariables): Promise<IncreaseResult> {
    return await this.dependencies.counter.increase(variables)
  }
}

export type DecreaseVariables = number

export type DecreaseResult = number

export class DecreaseCountUseCase extends CounterUseCasee<
  DecreaseVariables,
  DecreaseResult
> {
  async execute(variables: DecreaseVariables): Promise<DecreaseResult> {
    return await this.dependencies.counter.decrease(variables)
  }
}

class CounterApplication extends Application<CounterUseCases> {
  constructor(dependencies: CounterDependencies) {
    super({
      getCount: new GetCountUseCase(dependencies),
      increase: new IncreaseCountUseCase(dependencies),
      decrease: new DecreaseCountUseCase(dependencies),
    })
  }
}

function useCounterApplication() {
  return useApplication<CounterApplication>()
}

const counterApplication = new CounterApplication({
  counter: new MockCounter(),
})

function useIncreaseCounter() {
  const counterApplication = useCounterApplication()
  return useUseCaseMutation(counterApplication.useCases.increase, {
    key: 'increase',
    updateKey: ['count'],
  })
}

function IncreaseCounterButton() {
  const [increase] = useIncreaseCounter()
  return <Button onClick={() => increase(1)}>Increase</Button>
}

function useDecreaseCounter() {
  const counterApplication = useCounterApplication()
  return useUseCaseMutation(counterApplication.useCases.decrease, {
    key: 'decrease',
    updateKey: ['count'],
  })
}

function DecreaseCounterButton() {
  const [decrease] = useDecreaseCounter()
  return <Button onClick={() => decrease(1)}>Decrease</Button>
}

function CounterValue() {
  const counterApplication = useCounterApplication()
  const { data: count } = useUseCaseQuery(
    counterApplication.useCases.getCount,
    {
      key: 'count',
    },
  )
  return <Input value={count} />
}

export default function ApplicationContextPlayground() {
  return (
    <ApplicationProvider application={counterApplication}>
      <div>
        <IncreaseCounterButton />
        <CounterValue />
        <DecreaseCounterButton />
      </div>
    </ApplicationProvider>
  )
}
