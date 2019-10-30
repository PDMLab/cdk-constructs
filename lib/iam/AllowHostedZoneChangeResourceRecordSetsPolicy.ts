import * as cdk from '@aws-cdk/core'
import * as iam from '@aws-cdk/aws-iam'
import * as route53 from '@aws-cdk/aws-route53'

export interface AllowHostedZoneChangeResourceRecordSetsPolicyProps {
  /**
   * The domain name the hosted zone has been setup for.
   *
   */
  domainName: string
}

export class AllowHostedZoneChangeResourceRecordSetsPolicy extends cdk.Construct {
    policy: iam.ManagedPolicy
  constructor(
    scope: cdk.Construct,
    id: string,
    props: AllowHostedZoneChangeResourceRecordSetsPolicyProps
  ) {
    super(scope, id)
    const zone = route53.HostedZone.fromLookup(this, 'hostedzone', {
      domainName: props.domainName
    })

    this.policy = new iam.ManagedPolicy(this, 'AllowChangeRecordSets', {
      managedPolicyName: 'allow-change-record-sets',
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          resources: [`arn:aws:route53:::${zone.hostedZoneId.substring(1)}`],
          actions: ['route53:ChangeResourceRecordSets']
        })
      ]
    })
  }
}
