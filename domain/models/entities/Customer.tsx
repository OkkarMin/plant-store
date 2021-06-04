import { Entity, BaseDomainEntity, Result, UniqueEntityID } from "types-ddd";

interface CustomerProps extends BaseDomainEntity {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
}

export class Customer extends Entity<CustomerProps> {
  public customerID: string;
  public firstName: string;
  public lastName: string;
  public phoneNumber: number;
  public email: string;

  private constructor(props: CustomerProps, id?: UniqueEntityID) {
    super(props, id);
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.phoneNumber = props.phoneNumber;
    this.email = props.email;
    this.customerID = this.phoneNumber.toString() + this.firstName;
  }

  public static create(
    props: CustomerProps,
    id?: UniqueEntityID
  ): Result<Customer> {
    if (
      !props.firstName &&
      !props.lastName &&
      !props.phoneNumber &&
      !props.email
    ) {
      return Result.fail<Customer>(
        "Required details for customer is not provided"
      );
    }

    const validPhoneNumber = /[8|9][0-9]{7}$/;
    if (!props.phoneNumber.toString(10).match(validPhoneNumber)) {
      return Result.fail<Customer>(
        "Phone number must start with 9 or 8 and have 8 digits"
      );
    }

    return Result.ok<Customer>(new Customer(props, id));
  }
}
