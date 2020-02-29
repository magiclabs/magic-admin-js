import test from 'ava';
import sinon from 'sinon';
import { createMagicAdminSDK } from '../../../lib/factories';
import { createTokenExpiredError } from '../../../../src/admin-sdk/core/sdk-exceptions';

function createStubbedResponse() {
  const status = sinon.stub();
  const send = sinon.stub();
  const end = sinon.stub();
  status.returns({ send });
  send.returns({ end });

  return {
    statusStub: status,
    sendStub: send,
    endStub: end,
    res: { status } as any,
  };
}

test('#01: Express middleware succeeds validation', async t => {
  const sdk = createMagicAdminSDK();

  const req: any = {
    headers: {
      authorization: 'Bearer 12345',
    },
  };
  const resStub = createStubbedResponse();
  const next = sinon.stub();

  const validateStub = sinon.stub();
  sdk.token.validate = validateStub;

  await t.notThrowsAsync(sdk.middlewares.express(req, resStub.res, next));
  t.true(validateStub.calledWith('12345'));
  t.true(next.calledOnce);
});

test('#02: Fails with `401` when headers/authorization is missing', async t => {
  const sdk = createMagicAdminSDK();

  const req: any = {};
  const resStub = createStubbedResponse();
  const next = sinon.stub();

  const validateStub = sinon.stub();
  sdk.token.validate = validateStub;

  await t.notThrowsAsync(sdk.middlewares.express(req, resStub.res, next));
  t.true(resStub.statusStub.calledOnceWith(401));
  t.true(
    resStub.sendStub.calledOnceWith(
      'Magic Admin SDK Error: [ERROR_MISSING_AUTH_HEADER] Missing authorization header. Request failed authentication.',
    ),
  );
});

test('#03: Fails with `401` when request object is undefined', async t => {
  const sdk = createMagicAdminSDK();

  const req: any = undefined;
  const resStub = createStubbedResponse();
  const next = sinon.stub();

  const validateStub = sinon.stub();
  sdk.token.validate = validateStub;

  await t.notThrowsAsync(sdk.middlewares.express(req, resStub.res, next));
  t.true(resStub.statusStub.calledOnceWith(401));
  t.true(
    resStub.sendStub.calledOnceWith(
      'Magic Admin SDK Error: [ERROR_MISSING_AUTH_HEADER] Missing authorization header. Request failed authentication.',
    ),
  );
});

test('#04: Fails with `401` when `token.validation` throws', async t => {
  const sdk = createMagicAdminSDK();

  const req: any = {
    headers: {
      authorization: 'Bearer 12345',
    },
  };
  const resStub = createStubbedResponse();
  const next = sinon.stub();

  const error = createTokenExpiredError();

  const validateStub = sinon.stub().throws(error);
  sdk.token.validate = validateStub;

  await t.notThrowsAsync(sdk.middlewares.express(req, resStub.res, next));
  t.true(resStub.statusStub.calledOnceWith(401));
  t.true(resStub.sendStub.calledOnceWith(error.message));
});
