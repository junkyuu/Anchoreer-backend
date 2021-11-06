import { Container } from 'inversify';

import * as Service from './service';
import * as ModelMapper from './data/mapper/ModelMapper';
import * as Repository from './data/repository';
import * as Util from './util';

import UserServiceImpl from './service/implement/UserServiceImpl';

import UserRepositoryImpl from './data/repository/implement/UserRepositoryImpl';
import AuthTokenRepositoryImpl from './data/repository/implement/AuthTokenRepositoryImpl';

import UserMapperImpl  from './data/mapper/implement/UserMapperImpl';
import AuthTokenMapperImpl from './data/mapper/implement/AuthTokenMapperImpl';

import EncryptorImpl from './util/implement/EncryptorImpl';
import ValidatorImpl from './util/implement/ValidatorImpl';

const container: Container = new Container();

//Service
container.bind<Service.UserService>("UserService").to(UserServiceImpl);

//ModelMapper
container.bind<ModelMapper.UserMapper>("UserMapper").to(UserMapperImpl);
container.bind<ModelMapper.AuthTokenMapper>("AuthTokenMapper").to(AuthTokenMapperImpl);

//Repository
container.bind<Repository.UserRepository>("UserRepository").to(UserRepositoryImpl);
container.bind<Repository.AuthTokenRepository>("AuthTokenRepository").to(AuthTokenRepositoryImpl);

//Util
container.bind<Util.Encryptor>("Encryptor").to(EncryptorImpl);
container.bind<Util.Validator>("Validator").to(ValidatorImpl);

export default container;