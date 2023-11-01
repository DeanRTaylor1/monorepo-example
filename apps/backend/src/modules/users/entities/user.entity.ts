import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  IsEmail,
  Default,
  DataType,
} from "sequelize-typescript";
import { RoleEnum, UserStatusEnum } from "../user.enum";
import { ApiProperty } from "@nestjs/swagger";
import { SnakeApiProperty } from "../../base/decorators/snake-api-property";

@Table({ tableName: "users", timestamps: true, underscored: true })
export class User extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty()
  @Unique
  @Column(DataType.STRING)
  username: string;

  @SnakeApiProperty()
  @Column({ field: "first_name", type: DataType.STRING })
  firstName: string;

  @SnakeApiProperty()
  @Column({ field: "last_name", type: DataType.STRING })
  lastName: string;

  @SnakeApiProperty()
  @Unique
  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @Column({ field: "password", type: DataType.STRING })
  password: string;

  @SnakeApiProperty()
  @Default("inactive")
  @Column(DataType.ENUM(...Object.values(UserStatusEnum)))
  status: string;

  @SnakeApiProperty()
  @Default("user")
  @Column(DataType.ENUM(...Object.values(RoleEnum)))
  role: string;

  @SnakeApiProperty()
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt: Date;

  @SnakeApiProperty()
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt: Date;
}
