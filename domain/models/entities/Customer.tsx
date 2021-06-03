import { Entity, BaseDomainEntity, Result, UniqueEntityID } from "types-ddd";

interface CustomerProps extends BaseDomainEntity {
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

export class Customer extends Entity<CustomerProps> {
  public customerID: string;
  public firstName: string;
  public lastName: string;
  public phoneNumber: number;

  private constructor(props: CustomerProps, id?: UniqueEntityID) {
    super(props, id);
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.phoneNumber = props.phoneNumber;
    this.customerID = this.phoneNumber.toString() + this.firstName;
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
