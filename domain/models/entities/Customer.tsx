import { Entity, BaseDomainEntity, Result, UniqueEntityID } from "types-ddd";

interface CustomerProps extends BaseDomainEntity {
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

export class Customer extends Entity<CustomerProps> {
  private constructor(props: CustomerProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get phoneNumber(): number {
    return this.props.phoneNumber;
  }

  get customerID(): string {
    return this.props.phoneNumber.toString() + this.props.firstName;
  }

  public static create(
    props: CustomerProps,
    id?: UniqueEntityID
  ): Result<Customer> {
    if (!props.firstName && !props.lastName && !props.phoneNumber) {
      return Result.fail<Customer>(
        "Required details for customer is not provided"
      );
    }

    if (props.phoneNumber.toString(10).length !== 8) {
      return Result.fail<Customer>("Phone number must be 8 digits");
    }

    if (
      !props.phoneNumber.toString(10).startsWith("9") ||
      !props.phoneNumber.toString(10).startsWith("8")
    ) {
      return Result.fail<Customer>("Phone number must start with 9 or 8");
    }

    return Result.ok<Customer>(new Customer(props, id));
  }
}
