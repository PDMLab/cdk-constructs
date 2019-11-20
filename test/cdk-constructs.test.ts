import { expect as expectCDK, haveResource, SynthUtils } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import CdkConstructs = require('../lib/index');

const CDK_DEFAULT_ACCOUNT = '123'
const CDK_DEFAULT_REGION = 'eu-central-1'

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
  expectCDK(stack).to(
    haveResource('AWS::IAM::ManagedPolicy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 'route53:ChangeResourceRecordSets',
            Effect: 'Allow',
            Resource: 'arn:aws:route53:::hostedzone/DUMMY'
          },
          {
            Action: 'route53:ListHostedZonesByName',
            Effect: 'Allow',
            Resource: '*'
          },
          {
            Action: 'route53:GetHostedZone',
            Effect: 'Allow',
            Resource: 'arn:aws:route53:::hostedzone/DUMMY'
          },
          {
            Action: 'route53:GetChange',
            Effect: 'Allow',
            Resource: 'arn:aws:route53:::change/*'
          }
        ],
        Version: '2012-10-17'
      }
    })
  )
})