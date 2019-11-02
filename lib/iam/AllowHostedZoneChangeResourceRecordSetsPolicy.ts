import * as cdk from '@aws-cdk/core'
import * as iam from '@aws-cdk/aws-iam'
import * as route53 from '@aws-cdk/aws-route53'

export interface AllowHostedZoneChangeResourceRecordSetsPolicyProps {
  /**
   * The domain name the hosted zone has been setup for.
   */
  domainName: string
  /**
   * The name of the policy being created
   */
  policyName?: string
}

export class AllowHostedZoneChangeResourceRecordSetsPolicy extends cdk.Construct {
  policy: iam.ManagedPolicy

  /**
   * Create a policy which allows changing DNS records for a domain in a hosted zone in AWS Route53
   */
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
      managedPolicyName: props.policyName || 'allow-change-record-sets',
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          resources: [`arn:aws:route53:::${zone.hostedZoneId.substring(1)}`],
          actions: ['route53:ChangeResourceRecordSets']
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          resources: [`*`],
          actions: ['route53:ListHostedZonesByName']
        })
      ]
    })
  }
}
