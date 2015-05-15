using UnityEngine;

public class CannonBall : MonoBehaviour
{
	public GameObject ExplosionPrefab;

	void OnCollisionEnter(Collision collision)
	{
		Instantiate (ExplosionPrefab, transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
}
