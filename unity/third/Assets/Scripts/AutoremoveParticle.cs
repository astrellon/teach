using UnityEngine;

public class AutoremoveParticle : MonoBehaviour
{
	// Update is called once per frame
	void Update ()
    {
		var system = GetComponent<ParticleSystem> ();
		if (!system.IsAlive ())
        {
			Destroy (gameObject);
		}
	}
}
