import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, company, partner_type, notes, website } = req.body

    if (website) return res.json({ ok: true })

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required' })
    }

    const { error: dbError } = await supabase
      .from('form_submissions')
      .insert({
        form_type: 'partner',
        name,
        email,
        company: company || null,
        partner_type: partner_type || null,
        notes: notes || null,
      })

    if (dbError) console.error('Supabase error:', dbError)

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PROOF <notifications@proofhq.io>',
        to: process.env.NOTIFY_EMAIL || 'hello@proofhq.io',
        subject: `Partner enquiry: ${name} at ${company || 'unknown'} (${partner_type || 'unspecified'})`,
        html: `
          <h2>New partner enquiry</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
            <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${name}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Company</td><td style="padding:6px 12px;">${company || '—'}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Partner type</td><td style="padding:6px 12px;">${partner_type || '—'}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Notes</td><td style="padding:6px 12px;">${notes || '—'}</td></tr>
          </table>
          <p style="margin-top:16px;font-size:12px;color:#888;">Submitted via proofhq.io/partners</p>
        `,
      }),
    })

    return res.json({ ok: true })
  } catch (err) {
    console.error('Form error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
