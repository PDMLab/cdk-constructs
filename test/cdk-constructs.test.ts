import { expect as expectCDK, haveResource, SynthUtils } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import CdkConstructs = require('../lib/index');

const CDK_DEFAULT_ACCOUNT = process.env.CDK_DEFAULT_ACCOUNT
const CDK_DEFAULT_REGION = process.env.CDK_DEFAULT_REGION || 'eu-central-1'

test('AllowHostedZoneChangeResourceRecordSetsPolicy created', () => {
  const app = new cdk.App()
  const stack = new cdk.Stack(app, 'TestStack', {
    env: {
      account: CDK_DEFAULT_ACCOUNT,
      region: CDK_DEFAULT_REGION
    }
  })
  // WHEN
  new CdkConstructs.AllowHostedZoneChangeResourceRecordSetsPolicy(stack, 'MyTestConstruct', {
    domainName: 'mydomain.com'
  })
  // THEN
  expectCDK(stack).to(haveResource('AWS::IAM::ManagedPolicy'))
})